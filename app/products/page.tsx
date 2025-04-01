'use client';

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Table from "@/components/table/page";
import clsx from "clsx";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { IoAdd } from "react-icons/io5";
import Modal from "@/components/modal/page";
import CreateProduct from "@/components/createProduct/page";
import { startLoading, stopLoading } from "@/redux/slice/loadingSlice";
import { getAllProduct } from "@/redux/slice/product/product";

const Products = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter(); // Initialize the router
  const dispatch = useDispatch<AppDispatch>();
  const allProduct = useSelector((state: RootState) =>
    Array.isArray(state.product?.allProduct) ? state.product.allProduct : []
  );

  // Fetch products on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(startLoading());
        await dispatch(getAllProduct()).unwrap();
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch products");
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchData();
  }, [dispatch]);

  // Action handlers for table
  // const actions = useMemo(
  //   () => [
  //     {
  //       label: "View",
  //       className: "text-primary-1 cursor-pointer",
  //       onClick: (row: any) => {
  //         console.log("Row ID:", row.id); // Logs the row ID to the console
  //         router.push(`/orders/${row.id}`);
  //       },
  //     },
  //   ],
  //   [router]
  // );

  // Function to toggle the modal
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  // Table columns definition
  const columns = useMemo(
    () => [
      {
        key: "product_name",
        label: "Product Name",
        render: (row: any) => row.product_name,
      },
      {
        key: "product_category",
        label: "Product Category",
        render: (row: any) => row.product_category || "N/A", // Handle missing data
      },
      {
        key: "product_qty",
        label: "Available Quantity",
        render: (row: any) => row.product_qty,
      },
      {
        key: "product_price",
        label: "Price (₦)",
        render: (row: any) => `₦${row.product_price}`,
      },
    ],
    []
  );

  // Format product data for the table
  const formattedProducts = useMemo(
    () =>
      allProduct.map((item) => ({
        ...item,
        id: item._id, // Ensure each row has a unique `id`
      })),
    [allProduct]
  );

  return (
    <section className="w-full">
      <div className="flex justify-end">
        <button
          className="flex items-center gap-x-1 outline-none border-none bg-primary-1 text-white capitalize hover:border-2 hover:border-primary-1 hover:text-primary-1 hover:bg-transparent rounded-lg py-3 px-5"
          onClick={handleOpen}
        >
          <IoAdd size={25} />
          <span>Add Product</span>
        </button>
      </div>
      <div className="w-full border-primary-1 border-2 rounded-2xl lg:mt-20 sm:mt-10 lg:p-5 sm:p-2">
        <Table data={formattedProducts} columns={columns}  />
      </div>
      {open && (
        <Modal visible={open} onClose={handleOpen}>
          <CreateProduct handleClose={handleOpen} />
        </Modal>
      )}
    </section>
  );
};

export default Products;
