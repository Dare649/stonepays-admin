"use client";

import { usePathname } from "next/navigation";
import { nav } from "@/data/dummy";

// Custom Hook for Dynamic Page Header
export const useCurrentPathHierarchy = () => {
  const pathname = usePathname(); // ✅ Correct way to get the current path

  // Check if the path matches directly or starts with a dynamic segment
  for (const item of nav) {
    if (pathname === item.path || pathname.startsWith(`${item.path}/`)) {
      return {
        parent: item.title,
      };
    }
  }

  // Default to a fallback value if no match is found
  return {
    parent: "Dashboard", // Change "Unknown" to a more meaningful fallback
  };
};
