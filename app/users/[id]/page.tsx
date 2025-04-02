"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUser } from "@/redux/slice/users/users";
import { RootState, AppDispatch } from "@/redux/store";
import { startLoading, stopLoading } from "@/redux/slice/loadingSlice";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

const User = () => {
  const params = useParams();
  const id = params?.id as string; // Ensure `id` is treated as a string
  const dispatch = useDispatch<AppDispatch>();

  // Get user details from the Redux store
  const userDetails = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        toast.error("ID is missing.");
        return;
      }

      try {
        dispatch(startLoading());
        await dispatch(getUser(id)); // Use the `id` safely as a string
      } catch (error: any) {
        toast.error("Failed to fetch details.");
        console.error(error);
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchUser();
  }, [id, dispatch]); // Add dependencies to avoid React warnings

  return (
    <div className="w-full b-2 b-primary-1 rounded-xl lg:p-5 sm:p-2">
      <Link href={"/users"} className="font-bold mb-4 text-primary-1 text-md flex items-center gap-2">
      <span><FaArrowLeftLong/></span>
      <span>back</span>
      </Link>

      {userDetails ? (
        <div className="b-x-0 b-secondary-1 b-y-2 lg:p-3 sm:p-1 my-3 w-full">
          {/* User Details */}
          <div className="w-full">
            <h2 className="text-secondary-1 font-bold uppercase">User Details</h2>
            <div className="w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-5 mt-8">
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <img
                  src={userDetails?.user_img || "/default-user.png"}
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">First Name</h3>
                <h3 className="capitalize text-secondary-1 font-bold">
                  {userDetails?.first_name || "N/A"}
                </h3>
              </div>
              <div>
                <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">Last Name</h3>
                <h3 className="capitalize text-secondary-1 font-bold">
                  {userDetails?.last_name || "N/A"}
                </h3>
              </div>
              <div>
                <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">Email</h3>
                <h3 className="text-secondary-1 font-bold">{userDetails?.email || "N/A"}</h3>
              </div>
              <div>
                <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">Status</h3>
                <h3 className={`font-bold capitalize ${userDetails?.is_active === true ? "text-green-600" : "text-orange-500"}`}>
                  {userDetails?.is_active === true ? "Active" : "Inactive"}
                </h3>
              </div>

              <div>
                <h3 className="uppercase font-bold text-primary-1 text-xs mb-1">Verified</h3>
                <h3 className={`font-bold capitalize ${userDetails?.is_verified === true ? "text-green-600" : "text-orange-500"}`}>
                  {userDetails?.is_verified === true ? "Verified" : "Not Verified"}
                </h3>
              </div>

              
            </div>
          </div>

         
        </div>
      ) : (
        <p className="text-center text-primary-1">Loading details...</p>
      )}
    </div>
  );
};

export default User;
