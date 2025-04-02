"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getOrder } from "@/redux/slice/orders/order";
import { RootState, AppDispatch } from "@/redux/store";
import { startLoading, stopLoading } from "@/redux/slice/loadingSlice";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";


const OrderDetails = () => {
  const params = useParams();
  const id = params?.id as string; // Ensure `id` is treated as a string
  const dispatch = useDispatch<AppDispatch>();

  // Get order details from the Redux store
  const orderDetails = useSelector((state: RootState) => state.order.order);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) {
        toast.error("Order ID is missing.");
        return;
      }

      try {
        dispatch(startLoading());
        await dispatch(getOrder(id)); // Use the `id` safely as a string
      } catch (error: any) {
        toast.error("Failed to fetch order details.");
        console.error(error);
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchOrder();
  }, [id, dispatch]); // Add dependencies to avoid React warnings

  return (
    <div className="w-full border-2 border-primary-1 rounded-xl lg:p-5 sm:p-2">
      <h1 className="font-bold mb-4 uppercase text-primary-1 text-md">Order Details</h1>
      <Link href={"/orders"} className="font-bold mb-4 text-primary-1 text-md flex items-center gap-2">
      <span><FaArrowLeftLong/></span>
      <span>back</span>
      </Link>
      {orderDetails ? (
  <div className="border-x-0 border-secondary-1 border-y-2 lg:p-3 sm:p-1 my-3 w-full">
    {/* User Details */}
    <div className="w-full">
      <h2 className="text-secondary-1 font-bold uppercase">User Details</h2>
      <div className="w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-5 mt-8">
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <img
            src={orderDetails?.user_details?.user_img || "/default-user.png"}
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">First Name</h3>
          <h3 className="capitalize text-secondary-1 font-bold">
            {orderDetails?.user_details?.first_name || "N/A"}
          </h3>
        </div>
        <div>
          <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">Last Name</h3>
          <h3 className="capitalize text-secondary-1 font-bold">
            {orderDetails?.user_details?.last_name || "N/A"}
          </h3>
        </div>
        <div>
          <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">Email</h3>
          <h3 className="text-secondary-1 font-bold">{orderDetails?.user_details?.email || "N/A"}</h3>
        </div>
      </div>
    </div>

    {/* Product Details */}
    <div className="border-x-0 border-secondary-1 border-y-2 lg:p-3 sm:p-1 my-3 w-full">
      <h2 className="text-secondary-1 font-bold uppercase">Product Details</h2>
      {orderDetails?.products?.length > 0 ? (
        orderDetails.products.map((product: any) => (
          <div key={product?._id} className="w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-5 mt-8">
            <div>
              <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">Product Name</h3>
              <h3 className="text-secondary-1 font-bold capitalize">{product?.product_details?.product_name || "N/A"}</h3>
            </div>
            <div>
              <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">Product Category</h3>
              <h3 className="text-secondary-1 font-bold capitalize">
                {product?.product_details?.product_category?.join(", ") || "N/A"}
              </h3>
            </div>
            <div>
              <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">Quantity</h3>
              <h3 className="text-secondary-1 font-bold capitalize">{product?.quantity || "0"}</h3>
            </div>
            <div>
              <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">Price</h3>
              <h3 className="text-secondary-1 font-bold capitalize">{product?.price ? `$${product.price}` : "N/A"}</h3>
            </div>
          </div>
        ))
      ) : (
        <p className="text-primary-1">No products available.</p>
      )}
    </div>

    {/* Payment Details */}
    <div className="w-full">
      <h2 className="text-secondary-1 font-bold uppercase">Payment Details</h2>
      <div className="w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-5 mt-8">
        <div>
          <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">Status</h3>
          <h3
            className={`capitalize font-bold ${
              orderDetails?.status === "Pending" ? "text-orange-300" : "text-green-600"
            }`}
          >
            {orderDetails?.status || "Unknown Status"}
          </h3>
        </div>
        <div>
          <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">Amount</h3>
          <h3 className="capitalize text-secondary-1 font-bold">
            {orderDetails?.total_price ? `$${orderDetails.total_price}` : "N/A"}
          </h3>
        </div>
        <div>
          <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">Payment Method</h3>
          <h3 className="text-secondary-1 font-bold">{orderDetails?.payment_method || "N/A"}</h3>
        </div>
      </div>
    </div>
  </div>
) : (
  <p className="text-center text-primary-1">Loading order details...</p>
)}

    </div>
  );
};

export default OrderDetails;
