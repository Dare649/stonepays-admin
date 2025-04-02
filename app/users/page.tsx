'use client';

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Table from "@/components/table/page";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { getAllUser, deleteUser } from "@/redux/slice/users/users";
import { startLoading, stopLoading } from "@/redux/slice/loadingSlice";

type ColumnType = {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
};

const Users = () => {
  const router = useRouter(); // Initialize the router
  const dispatch = useDispatch<AppDispatch>();
  const allUser = useSelector((state: RootState) =>
    Array.isArray(state.user?.allUser) ? state.user.allUser : []
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
        await dispatch(getAllUser()).unwrap();
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch users");
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchData();
  }, [dispatch]);

  const handleDelete = async (userId: string) => {
    // Show confirmation toast
    toast.info(
      <div className="flex flex-col items-center text-center">
        <p className="mb-4">Are you sure you want to delete this user?</p>
        <div className="flex items-center gap-3">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={async () => {
              toast.dismiss(`delete-${userId}`); // Dismiss the confirmation toast
              dispatch(startLoading());
              try {
                await dispatch(deleteUser(userId)).unwrap(); // Delete user by userId
                toast.success("User deleted successfully");
  
                // Refetch all users after deletion
                await dispatch(getAllUser()).unwrap();
              } catch (error: any) {
                toast.error(error.message || "Failed to delete user");
              } finally {
                dispatch(stopLoading());
              }
            }}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 px-3 py-1 rounded"
            onClick={() => toast.dismiss(`delete-${userId}`)} // Dismiss the confirmation toast
          >
            No
          </button>
        </div>
      </div>,
      { toastId: `delete-${userId}` } // Unique toastId for each confirmation
    );
  };
  

  const actions = useMemo(
    () => [
      {
        label: "View",
        className: "text-primary-1 cursor-pointer",
        onClick: (row: any) => {
          console.log("Row ID:", row.id); // Logs the row ID to the console
          router.push(`/users/${row.id}`);
        },
      },
      {
        label: "Delete",
        className: "text-red-500 cursor-pointer",
        onClick: (row: any) => handleDelete(row.id), // Call handleDelete
      },
    ],
    [router]
  );

  const columns: ColumnType[] = [
    { key: "createdAt", label: "Date", render: (row) => formatDateTime(row.createdAt) },
    {
      key: "name",
      label: "Customer Name",
      render: (row) => `${row.first_name || ""} ${row.last_name || ""}`,
    },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={`font-medium ${row.is_verified ? "text-green-500" : "text-orange-300"}`}
        >
          {row.is_verified ? "Verified" : "Not Verified"}
        </span>
      ),
    },
  ];

  const formattedUsers = useMemo(
    () =>
      [...allUser]
        .map((item) => ({
          ...item,
          id: item._id, // Ensure each row has a unique `id`
        }))
        .sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0; // Default to 0 if undefined
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA; // Sort descending (newest first)
        }),
    [allUser]
  );

  return (
    <section className="w-full">
      <div className="w-full lg:mt-20 sm:mt-10 lg:p-5 sm:p-2">
        <Table data={formattedUsers} columns={columns} actions={actions} />
      </div>
    </section>
  );
};

export default Users;
