'use client';

import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '@/redux/slice/loadingSlice';
import { RootState } from '@/redux/store';
import { product_category } from '@/data/dummy';
import Select from 'react-select';
import { createProduct, getAllProduct, updateProduct } from '@/redux/slice/product/product';
import ImageUploader from '../image-upload/page';
import { useRouter } from 'next/navigation';

interface CreateProductProps {
    handleClose: () => void;
    productData?: FormState | null;
}

interface FormState {
    _id?: string;
    product_name: string;
    product_category: string;
    product_price: number;
    product_description: string;
    product_img: string;
    product_qty: number;
}

const CreateProduct = ({ handleClose, productData }: CreateProductProps) => {
    const dispatch = useDispatch<any>();
    const isLoading = useSelector((state: RootState) => state.loading.isLoading);
    const router = useRouter();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState<FormState>({
        product_name: "",
        product_category: "",
        product_price: 0,
        product_description: "",
        product_img: "",
        product_qty: 0,
    });

    useEffect(() => {
        if (productData) {
            setFormData({
                product_name: productData.product_name || "",
                product_category: productData.product_category || "",
                product_price: productData.product_price || 0,
                product_description: productData.product_description || "",
                product_img: productData.product_img || "",
                product_qty: productData.product_qty || 0,
            });
        }
    }, [productData]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: ["product_qty", "product_price"].includes(name) ? (value === "" ? "" : Number(value)) : value,
        }));
    };

    const handleCategoryChange = (selectedOption: any) => {
        setFormData((prevData) => ({
            ...prevData,
            product_category: selectedOption?.value || "",
        }));
    };

    const handleImageUpload = (name: string, base64String: string) => {
        setFormData((prevData) => ({
            ...prevData,
            product_img: base64String,
        }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.product_name) newErrors.product_name = "Product name is required.";
        if (!formData.product_category) newErrors.product_category = "Product category is required.";
        if (!formData.product_description) newErrors.product_description = "Product description is required.";
        if (!formData.product_price) newErrors.product_price = "Product price is required.";
        if (!formData.product_qty) newErrors.product_qty = "Product quantity is required.";
        if (!formData.product_img) newErrors.product_img = "Product image is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const convertImageToBase64 = async (url: string) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise((resolve) => {
            reader.onloadend = () => resolve(reader.result);
        });
    };
    

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateForm()) return;
    
        dispatch(startLoading());
    
        try {
            const formattedData = {
                ...formData,
                product_price: Number(formData.product_price),
                product_qty: Number(formData.product_qty),
            };
    
            // If the product image is a URL, convert it to Base64
            if (formattedData.product_img) {
                const base64Image = await convertImageToBase64(formattedData.product_img);
                formattedData.product_img = base64Image as string;
            }
    
            let result;
            if (productData?._id) {
                // Update the product with the correct ID in the URL
                result = await dispatch(updateProduct({
                    id: productData._id,
                    data: formattedData,
                }) as any).unwrap();
                dispatch(getAllProduct());
            } else {
                // Create a new product
                result = await dispatch(createProduct(formattedData) as any).unwrap();
            }
    
            if (result?.success) {
                toast.success(productData?._id ? "Product updated successfully!" : "Product created successfully!");
                handleClose();
            } else {
                throw new Error(result?.message || "Failed to submit form");
            }
        } catch (error: any) {
            console.error('Error during product submission:', error);
            toast.error(error.message || "Failed to create product, try again!");
            handleClose();
        } finally {
            dispatch(stopLoading());
        }
    };
    
    

    const categoryOptions = product_category.map((item) => ({
        value: item,
        label: item,
    }));

    return (
        <div className="w-full h-[80vh] flex flex-col">
            <div className="flex items-center justify-between">
                <h2 className="font-bold lg:text-xl sm:text-lg capitalize">{productData?._id ? "Update Product" : "Create Product"}</h2>
                <div onClick={handleClose}>
                    <IoMdClose size={30} className="text-red-500 cursor-pointer" />
                </div>
            </div>

            <div className="pt-3 pb-2">
                <hr className="w-full border-none h-0.5 bg-gray-300" />
            </div>

            <div className="w-full lg:p-3 sm:p-2 flex-1 overflow-y-auto custom-scroll">
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="product_name" className="text-sm font-bold uppercase text-primary-1 mb-2 block">Product Name</label>
                        <input 
                            type="text" 
                            id="product_name"
                            name="product_name"
                            value={formData.product_name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            className="w-full bg-transparent outline-none border-2 border-gray-300 focus:border-primary-1 rounded-lg p-2"
                        />
                        {errors.product_name && <p className="text-red-500 text-sm">{errors.product_name}</p>}
                    </div>

                    <div className="mb-3">
                        <label className="text-sm font-bold uppercase text-primary-1 mb-2 block">Product Category</label>
                        <Select
                            name="product_category"
                            value={categoryOptions.find(option => option.value === formData.product_category)}
                            onChange={handleCategoryChange}
                            options={categoryOptions}
                            placeholder="Select a product category"
                            classNamePrefix="react-select"
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    borderColor: errors.product_category ? "red" : "rgba(209, 213, 219, 1)", // Gray-300
                                    borderWidth: "2px",
                                    borderRadius: "0.5rem",
                                }),
                            }}
                        />
                        {errors.product_category && <p className="text-red-500 text-sm">{errors.product_category}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="product_price" className="text-sm font-bold uppercase text-primary-1 mb-2 block">Product Price</label>
                        <input 
                            type="number" 
                            id="product_price"
                            name="product_price"
                            value={formData.product_price}
                            onChange={handleChange}
                            placeholder="Enter product price"
                            className="w-full bg-transparent outline-none border-2 border-gray-300 focus:border-primary-1 rounded-lg p-2 appearance-none"
                        />
                        {errors.product_price && <p className="text-red-500 text-sm">{errors.product_price}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="product_qty" className="text-sm font-bold uppercase text-primary-1 mb-2 block">Product Quantity</label>
                        <input 
                            type="number" 
                            id="product_qty"
                            name="product_qty"
                            value={formData.product_qty}
                            onChange={handleChange}
                            placeholder="Enter product quantity"
                            className="w-full bg-transparent outline-none border-2 border-gray-300 focus:border-primary-1 rounded-lg p-2 appearance-none"
                        />
                        {errors.product_qty && <p className="text-red-500 text-sm">{errors.product_qty}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="product_description" className="text-sm font-bold uppercase text-primary-1 mb-2 block">Product Description</label>
                        <textarea
                            id="product_description"
                            name="product_description"
                            value={formData.product_description}
                            onChange={handleChange}
                            placeholder="Write product description"
                            rows={3}
                            className="w-full bg-transparent outline-none border-2 border-gray-300 focus:border-primary-1 rounded-lg p-2"
                        />
                        {errors.product_description && <p className="text-red-500 text-sm">{errors.product_description}</p>}
                    </div>

                    <div className="mb-3">
                        <ImageUploader
                            id="product_img"
                            name="product_img"
                            text="Upload Product Image"
                            onChange={handleImageUpload}
                        />
                        {errors.product_img && <p className="text-red-500 text-sm">{errors.product_img}</p>}
                    </div>

                    <button
                        type="submit"
                        className="rounded-lg bg-primary-1 w-full text-white hover:text-primary-1 hover:bg-transparent hover:border-2 hover:border-primary-1 outline-none py-3 cursor-pointer capitalize"
                    >
                        {isLoading ? "Processing..." : productData?._id ? "Update Product" : "Create Product"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
