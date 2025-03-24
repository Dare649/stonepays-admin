'use client';

import { nav } from "@/data/dummy";
import Link from "next/link";
import { IoLogOutOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "@/redux/slice/loadingSlice";
import { RootState } from "@/redux/store";

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);


  // function for sign out
  const handleSignout = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(startLoading());

    setTimeout(() => {
      router.push('/');
      toast.success('Sign out success!');
      dispatch(stopLoading());
    }, 3000)
  }
  return (
    <div className="w-full h-full border-r-2 border-primary-1 shadow-lg flex flex-col items-center justify-between py-5">
      {/* Navigation Links */}
      <div className="w-full px-3 mt-[10%]">
        {nav.map((item, id) => (
          <Link
            href={item.path}
            key={id}
            className="p-3 flex items-center gap-x-3 hover:bg-primary-1/60 rounded-lg cursor-pointer hover:text-white active:text-primary-1 font-semibold text-secondary-1 capitalize"
          >
            <h2>{item.icon}</h2>
            <h2>{item.title}</h2>
          </Link>
        ))}
      </div>

      {/* Sign Out Button (Centered in Sidebar) */}
      <div 
        className="flex justify-center fixed bottom-20"
        
      >
        <button onClick={handleSignout} className="bg-red-600 cursor-pointer text-white font-bold capitalize rounded-lg p-2 flex items-center gap-x-1">
          <span><IoLogOutOutline size={25} /></span>
          <span>{ isLoading ? 'loading' : 'sign out'}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
