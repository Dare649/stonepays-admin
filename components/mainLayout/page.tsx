"use client";

import React, { ReactNode } from "react";
import Topbar from "../topbar/page";
import Sidebar from "../sideBar/page";
import { useCurrentPathHierarchy } from "@/hooks/PathName";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { parent } = useCurrentPathHierarchy();
  return (
    <div className="flex flex-col h-screen">
      <Topbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="hidden lg:flex lg:w-[20%] fixed left-0 lg:top-[8%] h-[91vh] bg-white overflow-y-auto">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 lg:ml-[20%] lg:p-10 sm:p-5 bg-logo sm:mt-20">
          <h2 className="lg:text-2xl font-bold capitalize text-primary-1">{parent}</h2>
          <div className="mt-5 ">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
