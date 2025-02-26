'use client';

import React from "react";
import Table from "@/components/table/page";
import { users } from "@/data/dummy";
import clsx from "clsx"; // Ensure clsx is installed: `npm install clsx`

type ColumnType = {
  key: "id" | "first_name" | "last_name" | "status" | "email" | "phone_number";
  label: string;
  render?: (row: any) => React.ReactNode;
};

const Users = () => {
  const columns: ColumnType[] = [
    { key: "first_name", label: "First Name" },
    { key: "last_name", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "phone_number", label: "Phone Number" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={clsx("font-medium", {
            "text-orange-300": row.status.toLowerCase() === "inactive",
            "text-green-500": row.status.toLowerCase() === "active",
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
        <Table data={users} columns={columns} actions={actions} />
      </div>
    </section>
  );
};

export default Users;
