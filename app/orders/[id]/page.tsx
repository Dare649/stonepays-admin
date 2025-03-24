"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getOrder } from "@/redux/slice/orders/order";
import { RootState, AppDispatch } from "@/redux/store";
import { startLoading, stopLoading } from "@/redux/slice/loadingSlice";

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

      {orderDetails ? (
          <div className="border-x-0 border-secondary-1 border-y-2 lg:p-3 sm:p-1 my-3 w-full">
            <div className="w-full">
                <h2 className="text-secondary-1 font-bold uppercase ">User Details</h2>
                <div className="w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-5 mt-8">
                    <div className="w-20 h-20 rounded-full">
                        <img
                            src={orderDetails.user_details.user_img}
                            alt="User Profile"
                            className="w-full"
                        />
                    </div>
                    <div>
                        <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">first name</h3>
                        <h3 className="capitalize text-secondary-1 font-bold">{orderDetails.user_details.first_name}</h3>
                    </div>
                    <div>
                        <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">last name</h3>
                        <h3 className="capitalize text-secondary-1 font-bold">{orderDetails.user_details.last_name}</h3>
                    </div>
                    <div>
                        <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">email</h3>
                        <h3 className="text-secondary-1 font-bold">{orderDetails.user_details.email}</h3>
                    </div>
                </div>
            </div>
            
          <div className="border-x-0 border-secondary-1 border-y-2 lg:p-3 sm:p-1 my-3 w-full">
            <h2 className="text-secondary-1 font-bold uppercase ">product Details</h2>
            {orderDetails.products.map((product: any) => (
              <div key={product._id} className="w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-5 mt-8">

                <div>
                    <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">product name</h3>
                    <h3 className="text-secondary-1 font-bold capitalize"> {product.product_details.product_name}</h3>
                </div>
                <div>
                    <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">product category</h3>
                    <h3 className="text-secondary-1 font-bold capitalize"> {product.product_details.product_category.join(", ")}</h3>
                </div>
                <div>
                    <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">quantity</h3>
                    <h3 className="text-secondary-1 font-bold capitalize"> {product.quantity}</h3>
                </div>
                <div>
                    <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">product category</h3>
                    <h3 className="text-secondary-1 font-bold capitalize"> {product.price}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}

          <div className="w-full">
                <h2 className="text-secondary-1 font-bold uppercase ">payment details</h2>
                <div className="w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-5 mt-8">
                    <div>
                        <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">status</h3>
                        <h3
                            className={`capitalize font-bold ${
                                orderDetails?.status === "Pending" 
                                ? "text-orange-300" 
                                : "text-green-600"
                            }`}
                            >
                            {orderDetails?.status || "Unknown Status"}
                        </h3>

                    </div>
                    <div>
                        <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">amount</h3>
                        <h3 className="capitalize text-secondary-1 font-bold">{orderDetails.total_price}</h3>
                    </div>
                    <div>
                        <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">payment method</h3>
                        <h3 className="text-secondary-1 font-bold">{orderDetails.payment_method}</h3>
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
