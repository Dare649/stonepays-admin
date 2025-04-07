'use client';

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Table from "@/components/table/page";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { getAllOrder, deleteOrder, updateOrderStatus } from "@/redux/slice/orders/order";
import { startLoading, stopLoading } from "@/redux/slice/loadingSlice";
import { getAllProduct } from "@/redux/slice/product/product";

type ColumnType = {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
};


const Orders = () => {
  const router = useRouter(); // Initialize the router
  const dispatch = useDispatch<AppDispatch>();
  const allOrder = useSelector((state: RootState) =>
    Array.isArray(state.order?.allOrder) ? state.order.allOrder : []
  );
  const allProduct = useSelector((state: RootState) =>
    Array.isArray(state.product?.allProduct) ? state.product.allProduct : []
  );

  const formatDateTime = (isoString: string | null | undefined): string => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(startLoading());
        await dispatch(getAllOrder()).unwrap();
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch orders");
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchData();
  }, [dispatch]);

  // get all products so as to compare with the product id in the order table to fix the product name
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        dispatch(startLoading());
        await dispatch(getAllProduct()).unwrap();
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch products");
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchProduct();
  }, [dispatch]);

  

  const getProductName = (productId: string) => {
    const product = allProduct.find((p) => p.id === productId);
    return product ? product.product_name : "Unknown Product";
  };


  

  const formatNumber = (num: number) => {
    return Number(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  const columns: ColumnType[] = [
    { key: "createdAt", label: "Date", render: (row) => formatDateTime(row.createdAt) },
    {
      key: "user_details",
      label: "Customer Name",
      render: (row) => `${row.user_details?.first_name || ""} ${row.user_details?.last_name || ""}`,
    },
    {
      key: "product_name",
      label: "Product Name",
      render: (row) => getProductName(row.products?.[0]?.product_details?._id) || "N/A",
    },
    { key: "total_price", label: "Amount", render: (row) => `₦${formatNumber(row.total_price)}` },
    {
      key: "order_status",
      label: "Status",
      render: (row) => {
        
        return (
          <span
            className={`font-bold ${
              row.order_status === "Approved" ? "text-green-500" : "text-orange-500"
            }`}
          >
            {row.order_status}
          </span>
        );
      },    
    },
  ];
  

  const formattedOrders = useMemo(
    () =>
      [...allOrder]
        .map((item) => ({
          ...item,
          id: item._id, // Ensure each row has a unique `id`
        }))
        .sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0; // Default to 0 if undefined
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA; // Sort descending (newest first)
        }),
    [allOrder]
  );


  
  const handleDelete = async (orderId: string) => {
     // Show confirmation toast
     toast.info(
       <div className="flex flex-col items-center text-center">
         <p className="mb-4">Are you sure you want to delete this order?</p>
         <div className="flex items-center gap-3">
           <button
             className="bg-red-500 text-white px-3 py-1 rounded"
             onClick={async () => {
               toast.dismiss(`delete-${orderId}`); // Dismiss the confirmation toast
               dispatch(startLoading());
               try {
                 await dispatch(deleteOrder(orderId)).unwrap(); // Delete user by orderId
                 toast.success("order deleted successfully");
   
                 // Refetch all orders after deletion
                 await dispatch(getAllOrder()).unwrap();
               } catch (error: any) {
                 toast.error(error.message || "Failed to delete order");
               } finally {
                 dispatch(stopLoading());
               }
             }}
           >
             Yes
           </button>
           <button
             className="bg-gray-300 px-3 py-1 rounded"
             onClick={() => toast.dismiss(`delete-${orderId}`)} // Dismiss the confirmation toast
           >
             No
           </button>
         </div>
       </div>,
       { toastId: `delete-${orderId}` } // Unique toastId for each confirmation
     );
   };


  const handleUpdateStatus = async (orderId: string) => {
     // Show confirmation toast
     toast.info(
       <div className="flex flex-col items-center text-center">
         <p className="mb-4">Are you sure you want to update this order status?</p>
         <div className="flex items-center gap-3">
           <button
             className="bg-red-500 text-white px-3 py-1 rounded"
             onClick={async () => {
               toast.dismiss(`delete-${orderId}`); // Dismiss the confirmation toast
               dispatch(startLoading());
               try {
                 await dispatch(updateOrderStatus(orderId)).unwrap(); // Delete user by orderId
                 toast.success("order status updated successfully");
   
                 // Refetch all orders after deletion
                 await dispatch(getAllOrder()).unwrap();
               } catch (error: any) {
                 toast.error(error.message || "Failed to update order status");
               } finally {
                 dispatch(stopLoading());
               }
             }}
           >
             Yes
           </button>
           <button
             className="bg-gray-300 px-3 py-1 rounded"
             onClick={() => toast.dismiss(`delete-${orderId}`)} // Dismiss the confirmation toast
           >
             No
           </button>
         </div>
       </div>,
       { toastId: `delete-${orderId}` } // Unique toastId for each confirmation
     );
   };

    const actions = useMemo(
      () => [
        {
          label: "View",
          className: "text-primary-1 cursor-pointer",
          onClick: (row: any) => {
            router.push(`/orders/${row.id}`);
          },
        },
        {
          label: "Update Status",
          className: "text-gray-500 cursor-pointer",
          onClick: (row: any) => handleUpdateStatus(row.id), // Call handleDelete
        },
        {
          label: "Delete",
          className: "text-red-500 cursor-pointer",
          onClick: (row: any) => handleDelete(row.id), // Call handleDelete
        },
      ],
      [router]
    );
  

  return (
    <section className="w-full">
      <div className="w-full lg:mt-20 sm:mt-10 lg:p-5 sm:p-2">
        <Table data={formattedOrders} columns={columns} actions={actions} />
      </div>
    </section>
  );
};

export default Orders;
