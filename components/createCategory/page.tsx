'use client';

import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '@/redux/slice/loadingSlice';
import { RootState } from '@/redux/store';
import Select from 'react-select';
import { createCategory, getAllCategory, updateCategory } from '@/redux/slice/productCategory/productCategory';
import ImageUploader from '../image-upload/page';
import { useRouter } from 'next/navigation';

interface CreateProductCategoryProps {
    handleClose: () => void;
    productData?: FormState | null;
}

interface FormState {
    _id?: string;
    category_name: string;
    category_description: string;
}

const CreateProductCategory = ({ handleClose, productData }: CreateProductCategoryProps) => {
    const dispatch = useDispatch<any>();
    const isLoading = useSelector((state: RootState) => state.loading.isLoading);
    const router = useRouter();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState<FormState>({
        category_name: "",
        category_description: "",
    });

    useEffect(() => {
        if (productData) {
            setFormData({
                category_name: productData.category_name || "",
                category_description: productData.category_description || "",
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
            category_description: selectedOption?.value || "",
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
        if (!formData.category_name) newErrors.category_name = "Product name is required.";
        if (!formData.category_description) newErrors.category_description = "Product category is required.";
       
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
            };
    
            let result;
            if (productData?._id) {
                // Update category
                result = await dispatch(updateCategory({
                    id: productData._id,
                    data: formattedData,
                }) as any).unwrap();
    
            } else {
                // Create category
                result = await dispatch(createCategory(formattedData) as any).unwrap();
            }
    
            if (result?.success) {
                toast.success(productData?._id ? "Category updated successfully!" : "Category created successfully!");
    
                // ✅ Fetch updated category list
                dispatch(getAllCategory());
    
                handleClose();
            } else {
                throw new Error(result?.message || "Failed to submit form");
            }
        } catch (error: any) {
            console.error('Error during product submission:', error);
            toast.error(error.message || "Failed to create category, try again!");
            handleClose();
        } finally {
            dispatch(stopLoading());
        }
    };
    
    
    


    return (
        <div className="w-full h-[80vh] flex flex-col">
            <div className="flex items-center justify-between">
                <h2 className="font-bold lg:text-xl sm:text-lg capitalize">{productData?._id ? "Update Product category" : "Create Product category"}</h2>
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
                        <label htmlFor="category_name" className="text-sm font-bold uppercase text-primary-1 mb-2 block">Product Name</label>
                        <input 
                            type="text" 
                            id="category_name"
                            name="category_name"
                            value={formData.category_name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            className="w-full bg-transparent outline-none border-2 border-gray-300 focus:border-primary-1 rounded-lg p-2"
                        />
                        {errors.category_name && <p className="text-red-500 text-sm">{errors.category_name}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="category_description" className="text-sm font-bold uppercase text-primary-1 mb-2 block">Product Description</label>
                        <textarea
                            id="category_description"
                            name="category_description"
                            value={formData.category_description}
                            onChange={handleChange}
                            placeholder="Write product description"
                            rows={3}
                            className="w-full bg-transparent outline-none border-2 border-gray-300 focus:border-primary-1 rounded-lg p-2"
                        />
                        {errors.category_description && <p className="text-red-500 text-sm">{errors.category_description}</p>}
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

export default CreateProductCategory;
