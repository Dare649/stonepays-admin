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
import { getAllProduct, deleteProduct, getProduct } from "@/redux/slice/product/product";

const Products = () => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
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


  const handleUpdate = async (row: any) => {
    if (!row || !row?.id) {
      toast.error("Invalid vehicle record ID");
      return;
    }

    try {
      dispatch(startLoading());
      const response = await dispatch(getProduct(row?.id)).unwrap();

      if (response) {
        setSelectedRow(response);
        setOpen(true);
      } else {
        toast.error("No data found for the selected record.");
      }
    } catch (error: any) {
      console.error("API Call Error:", error);
      toast.error(error.message || "Failed to fetch record");
    } finally {
      dispatch(stopLoading());
    }
  };


  const handleClose = async () => {
    setOpen(false);
    setSelectedRow(null);

    // ✅ Ensure table reloads after updating
    dispatch(getAllProduct());
  };

  const handleDelete = async (productId: string) => {
      // Show confirmation toast
      toast.info(
        <div className="flex flex-col items-center text-center">
          <p className="mb-4">Are you sure you want to delete this product?</p>
          <div className="flex items-center gap-3">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={async () => {
                toast.dismiss(`delete-${productId}`); // Dismiss the confirmation toast
                dispatch(startLoading());
                try {
                  await dispatch(deleteProduct(productId)).unwrap(); // Delete product by productId
                  toast.success("Product deleted successfully");
    
                  // Refetch all products after deletion
                  await dispatch(getAllProduct()).unwrap();
                } catch (error: any) {
                  toast.error(error.message || "Failed to delete product");
                } finally {
                  dispatch(stopLoading());
                }
              }}
            >
              Yes
            </button>
            <button
              className="bg-gray-300 px-3 py-1 rounded"
              onClick={() => toast.dismiss(`delete-${productId}`)} // Dismiss the confirmation toast
            >
              No
            </button>
          </div>
        </div>,
        { toastId: `delete-${productId}` } // Unique toastId for each confirmation
      );
    };
    
  
    const actions = useMemo(
      () => [
        {
          label: "View",
          className: "text-primary-1 cursor-pointer",
          onClick: (row: any) => {
            console.log("Row ID:", row.id); // Logs the row ID to the console
            router.push(`/products/${row.id}`);
          },
        },{
          label: "Update",
          onClick: (row: any) => handleUpdate(row),
          className: "text-secondary-1 cursor-pointer",
        },
        {
          label: "Delete",
          className: "text-red-500 cursor-pointer",
          onClick: (row: any) => handleDelete(row.id),
        },
      ],
      [router]
    );

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
      <div className="w-full lg:mt-20 sm:mt-10 lg:p-5 sm:p-2">
        <Table data={formattedProducts} columns={columns} actions={actions} />
      </div>
      {open && (
        <Modal visible={open} onClose={handleOpen}>
          <CreateProduct handleClose={handleOpen} productData={selectedRow}/>
        </Modal>
      )}
    </section>
  );
};

export default Products;
