"use client";

import { usePathname } from "next/navigation";
import { nav } from "@/data/dummy";

// Custom Hook for Dynamic Page Header
export const useCurrentPathHierarchy = () => {
    const pathname = usePathname(); // ✅ Correct way to get the current path

    for (const item of nav) {
        if (item.path === pathname) {
            return {
                parent: item.title
            };
        }
    }

    return {
        parent: "Unknown"
    };
};
