'use client';

import { useState } from "react";
import Image from "next/image";
import { IoMenuSharp, IoLogOutOutline } from "react-icons/io5";
import { nav } from "@/data/dummy";
import Link from "next/link";
import Modal from "../modal/page";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "@/redux/slice/loadingSlice";
import { RootState } from "@/redux/store";

const Topbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
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

  // function to toggle menu
  const handleToggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  return (
    <div className="w-full">
      {/* desktop view */}
      <div className="hidden lg:flex">
        <div className='w-full border-b-2 border-primary-1 py-2 px-5 shadow-lg fixed top-0 z-30 bg-white'>
          <div className='w-full flex items-center justify-between'>
            <div className="w-[15%]">
              <Image
                src={'/logo.png'}
                alt="stonepay-admin-app"
                width={100}
                height={100}
                className="w-full h-full object-cover"
                quality={100}
                priority
              />
            </div>
            <div className="flex items-center gap-x-3">
              <div className="flex flex-col">
                <h2 className="text-secondary-1 font-bold capitalize text-md">welcome,</h2>
                <h3 className="capitalize text-primary-1">fola osibo</h3>
              </div>
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={'/sign.jpg'}
                  alt="stonepay-admin-app"
                  width={50}
                  height={50}
                  className="w-full h-full object-cover rounded-full"
                  quality={100}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile view */}
      <div className="w-full lg:hidden flex">
        <div className="w-full border-b-2 border-primary-1 px-3 py-4 fixed top-0">
          <div className="flex items-center justify-between">
            <div className="w-[30%]">
              <Image
                src={'/logo.png'}
                alt="stonepay-admin-app"
                width={100}
                height={100}
                className="w-full h-full object-cover"
                quality={100}
                priority
              />
            </div>
            <div onClick={handleToggleMenu}>
              <IoMenuSharp size={30} className="text-secondary-1 font-bold"/>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for mobile menu */}
      {openMenu && (
        <Modal onClose={handleToggleMenu} visible={openMenu}>
          <div className="w-full h-screen flex">
            <div className="w-full h-full  p-5 relative">
              <div className="w-[30%]">
                <Image
                  src={'/logo.png'}
                  alt="stonepay-admin-app"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                  quality={100}
                  priority
                />
              </div>
              <div className="py-5 w-full">
                {nav.map((item, id) => (
                  <Link
                    href={item.path}
                    key={id}
                    className="py-3 flex items-center gap-x-3 active:text-primary-1 font-semibold border-b-2 border-primary-1 text-secondary-1 capitalize"
                    onClick={handleToggleMenu} // Close menu when clicking a link
                  >
                    <h2>{item.icon}</h2>
                    <h2>{item.title}</h2>
                  </Link>
                ))}
              </div>

              <div 
                className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex items-center"
              >
                <button onClick={handleSignout} className="bg-red-600 text-white font-bold capitalize rounded-lg p-2 flex items-center gap-x-1">
                  <span><IoLogOutOutline size={25}/></span>
                  <span>{ isLoading ? 'loading' : 'sign out'}</span>
                </button>
              </div>

              {/* Close icon */}
              <button
                className="absolute top-5 right-0 text-primary-1 font-bold text-2xl"
                onClick={handleToggleMenu}
              >
                <IoMdClose size={25}/>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Topbar;
