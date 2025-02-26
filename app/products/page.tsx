'use client';

import React from "react";
import Table from "@/components/table/page";
import { products } from "@/data/dummy";
import clsx from "clsx"; // Ensure clsx is installed: `npm install clsx`

type ColumnType = {
  key: "id" | "name" | "category" | "status" | "unit_price";
  label: string;
  render?: (row: any) => React.ReactNode;
};

const Products = () => {
  const columns: ColumnType[] = [
    { key: "name", label: "product name" },
    { key: "category", label: "product category" },
    { key: "unit_price", label: "unit price" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={clsx("font-medium", {
            "text-orange-300": row.status.toLowerCase() === "out-of-stock",
            "text-green-500": row.status.toLowerCase() === "in-stock",
          })}
        >
          {row.status}
        </span>
      ),
    },
  ];

  const actions = [
    {
      label: "View",
      onClick: (row: any) => console.log("Viewing", row),
    },
    {
      label: "Edit",
      onClick: (row: any) => console.log("Editing", row),
    },
    {
      label: "Delete", // ✅ Keep it as a string
      onClick: (row: any) => console.log("Deleting", row),
      className: "text-red-500 font-medium", // ✅ Pass CSS class for styling
    },
  ];

  return (
    <section className="w-full">
      <div className="w-full border-primary-1 border-2 rounded-2xl lg:mt-20 sm:mt-10 lg:p-5 sm:p-2">
        <Table data={products} columns={columns} actions={actions} />
      </div>
    </section>
  );
};

export default Products;
