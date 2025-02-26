'use client'

import React from "react";
import Table from "@/components/table/page";
import { trx } from "@/data/dummy";
import clsx from "clsx"; // Ensure clsx is installed: `npm install clsx`

type ColumnType = {
  key: "id" | "date" | "transaction_type" | "amount" | "status";
  label: string;
  render?: (row: any) => React.ReactNode; // Optional render function
};

const Transactions = () => {
  const columns: ColumnType[] = [
    { key: "date", label: "Date" },
    { key: "transaction_type", label: "transaction type" },
    { key: "amount", label: "Amount" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={clsx("font-medium", {
            "text-orange-300": row.status.toLowerCase() === "pending",
            "text-green-500": row.status.toLowerCase() === "successful",
            "text-red-500": row.status.toLowerCase() === "failed",
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
        <Table data={trx} columns={columns} />
      </div>
    </section>
  );
};

export default Transactions;
