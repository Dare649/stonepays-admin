'use client';

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Table from "@/components/table/page";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { getAllOrder } from "@/redux/slice/orders/order";
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

  const actions = useMemo(
    () => [
      {
        label: "View",
        className: "text-primary-1 cursor-pointer",
        onClick: (row: any) => {
          console.log("Row ID:", row.id); // Logs the row ID to the console
          router.push(`/orders/${row.id}`);
        },
      },
    ],
    [router]
  );

  const getProductName = (productId: string) => {
    const product = allProduct.find((p) => p.id === productId);
    return product ? product.product_name : "Unknown Product";
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
      render: (row) => getProductName(row.products?.[0]?.product_details?._id )|| "N/A",
    },
    // {
    //   key: "product_category",
    //   label: "Product Category",
    //   render: (row) =>
    //     row.products?.[0]?.product_details?.product_category,
    // },
    { key: "total_price", label: "Amount", render: (row) => `₦${row.total_price}` },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={`font-medium ${
            row.status.toLowerCase() === "pending" ? "text-orange-300" : "text-green-500"
          }`}
        >
          {row.status}
        </span>
      ),
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
  

  return (
    <section className="w-full">
      <div className="w-full border-primary-1 border-2 rounded-2xl lg:mt-20 sm:mt-10 lg:p-5 sm:p-2">
        <Table data={formattedOrders} columns={columns} actions={actions} />
      </div>
    </section>
  );
};

export default Orders;
