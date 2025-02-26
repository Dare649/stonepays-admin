'use client'

import React, { useState, useRef } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


// Type definitions for the table
interface Column<T> {
  key: keyof T;
  label: string;
  render?: (item: T) => React.ReactNode; // Custom rendering for a column
}

interface Action<T> {
  label: string;
  onClick: (item: T) => void;
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: Action<T>[]; // Optional action menu
  itemsPerPageOptions?: number[];
}

const Table = <T extends { id: string | number }>({
  data,
  columns,
  actions = [],
  itemsPerPageOptions = [5, 10, 20],
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const [selectedItemId, setSelectedItemId] = useState<number | string | null>(null);
  const [view, setView] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleActionClick = (id: string | number) => {
    setSelectedItemId(id);
    setView((prev) => !prev);
  };

  return (
    <div className="w-full mt-5 overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-primary-1 border-x-0 capitalize text-left text-md">
            {columns.map((col) => (
              <th key={col.key.toString()} className="lg:py-5 lg:px-3 sm:px-2 sm:py-3">
                {col.label}
              </th>
            ))}
            {actions.length > 0 && <th className="lg:py-5 lg:px-3 sm:px-2 sm:py-3">Actions</th>}
          </tr>
        </thead>
        <tbody className="bg-white">
          {currentItems.map((item) => (
            <tr key={item.id} className="border-y-2 border-secondary-1">
              {columns.map((col) => (
                <td key={col.key.toString()} className="lg:px-3 lg:py-5 sm:px-2 sm:py-3 font-medium capitalize text-secondary-1 text-sm">
                  {col.render ? col.render(item) : (item[col.key] as React.ReactNode)}
                </td>
              ))}
              {actions.length > 0 && (
                <td className="lg:px-2 lg:py-5 font-bold cursor-pointer relative w-[20%]">
                  <BsThreeDots onClick={() => handleActionClick(item.id)} />
                  {view && selectedItemId === item.id && (
                    <div
                      ref={popupRef}
                      className="absolute right-2.5 mt-1 z-10 bg-white w-full p-2 shadow-md rounded-lg"
                    >
                      {actions.map((action, index) => (
                        <p
                          key={index}
                          onClick={() => action.onClick(item)}
                          className={`block capitalize cursor-pointer text-primary-7 p-2 text-sm ${action.className || ""}`}
                        >
                          {action.label}
                        </p>
                      ))}
                    </div>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination - Fixed Width & Scrollable */}
      <div className="overflow-x-auto w-full min-w-max mt-2 text-sm">
        <div className="w-full min-w-max bg-white opacity-50 rounded-lg flex justify-between items-center p-3">
          <div className="text-secondary-1">
            {currentPage} - {itemsPerPage} of {data.length}
          </div>
          <div className="flex items-center gap-x-2 text-secondary-1">
            <div className="flex items-center">
              <p className="capitalize mr-2">Rows per page</p>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="cursor-pointer outline-none"
              >
                {itemsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="hover:bg-primary-1 bg-transparent hover:text-white border-2 border-secondary-1 rounded-lg p-1"
              disabled={currentPage === 1}
            >
              <FaChevronLeft size={15} />
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="hover:bg-primary-1 bg-transparent hover:text-white border-2 border-secondary-1 rounded-lg p-1"
              disabled={currentPage === totalPages}
            >
              <FaChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
