"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getProduct } from "@/redux/slice/product/product";
import { RootState, AppDispatch } from "@/redux/store";
import { startLoading, stopLoading } from "@/redux/slice/loadingSlice";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { getAllCategory } from "@/redux/slice/productCategory/productCategory";


const ProductDetails = () => {
  const params = useParams();
  const id = params?.id as string; // Ensure `id` is treated as a string
  const dispatch = useDispatch<AppDispatch>();

  // Get product details from the Redux store
  const productDetails = useSelector((state: RootState) => state.product.product);

  const allCategory = useSelector((state: RootState) =>
      Array.isArray(state.category?.allCategory) ? state.category.allCategory : []
    );

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        toast.error("Product ID is missing.");
        return;
      }

      try {
        dispatch(startLoading());
        await dispatch(getProduct(id));
        await dispatch(getAllCategory()).unwrap();
      } catch (error: any) {
        toast.error("Failed to fetch product details.");
        console.error(error);
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchProduct();
  }, [id, dispatch]);

  const getProductName = (categoryId: string) => {
    // Find the category by matching product_category_id
    const category = allCategory.find((p) => p._id === categoryId); // Ensure the comparison uses '_id'
    return category ? category.category_name : "Unknown Product";
  };

  return (
    <div className="w-full border-2 border-primary-1 rounded-xl lg:p-5 sm:p-2">
      <Link href={"/products"} className="font-bold mb-4 text-primary-1 text-md flex items-center gap-2">
      <span><FaArrowLeftLong/></span>
      <span>back</span>
      </Link>
      {productDetails ? (
        <div className=" lg:p-3 sm:p-1 my-3 w-full">
          {/* Product Details */}
          <div className="w-full">
            <h2 className="text-secondary-1 font-bold uppercase">Product Details</h2>
            <div className="w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-5 mt-8">
              <div>
                <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">Product Name</h3>
                <h3 className="text-secondary-1 font-bold capitalize">{productDetails?.product_name || "N/A"}</h3>
              </div>
              <div>
                <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">Product Category</h3>
                <h3 className="text-secondary-1 font-bold capitalize">{getProductName(productDetails?.product_category_id) || "N/A"}</h3>
              </div>
              <div>
                <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">Product Price</h3>
                <h3 className="text-secondary-1 font-bold">{productDetails?.product_price ? `$${productDetails.product_price}` : "N/A"}</h3>
              </div>
              <div>
                <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">Product Description</h3>
                <h3 className="text-secondary-1 font-bold">{productDetails?.product_description || "N/A"}</h3>
              </div>
              <div>
                <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">Product Quantity</h3>
                <h3 className="text-secondary-1 font-bold">{productDetails?.product_qty || "N/A"}</h3>
              </div>
              <div>
                <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">Created At</h3>
                <h3 className="text-secondary-1 font-bold">{productDetails?.createdAt ? new Date(productDetails.createdAt).toLocaleDateString() : "N/A"}</h3>
              </div>
              <div>
                <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">Product Image</h3>
                <img
                  src={productDetails?.product_img || "/default-product.png"}
                  alt={productDetails?.product_name || "Product Image"}
                  className="w-40 h-40 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-primary-1">Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetails;
