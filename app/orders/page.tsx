'use client'

import React from "react";
import Table from "@/components/table/page";
import { order } from "@/data/dummy";
import clsx from "clsx"; // Ensure clsx is installed: `npm install clsx`

type ColumnType = {
  key: "id" | "date" | "product" | "amount" | "status";
  label: string;
  render?: (row: any) => React.ReactNode;
};

const Orders = () => {
  const columns: ColumnType[] = [
    { key: "date", label: "Date" },
    { key: "product", label: "Product" },
    { key: "amount", label: "Amount" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={clsx("font-medium", {
            "text-orange-300": row.status.toLowerCase() === "pending",
            "text-green-500": row.status.toLowerCase() === "completed",
          })}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <section className="w-full">
      <div className="w-full border-primary-1 border-2 rounded-2xl lg:mt-20 sm:mt-10 lg:p-5 sm:p-2">
        <Table data={order} columns={columns}  />
      </div>
    </section>
  );
};

export default Orders;
