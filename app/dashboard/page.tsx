"use client";

import { useState, useEffect, useMemo } from "react";
import LineChart from "@/components/linechart/page";
import { StatsCard } from "@/components/statscard/page";
import Table from "@/components/table/page";
import { getProductCount } from "@/redux/slice/product/product";
import { getOrderCount, getOrderChart } from "@/redux/slice/orders/order";
import { getUserCount } from "@/redux/slice/users/users";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { startLoading, stopLoading } from "@/redux/slice/loadingSlice";
import { FiShoppingCart, FiUsers, FiPackage } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAllProduct } from "@/redux/slice/product/product";
import { getTopOrders } from "@/redux/slice/top-order/top";



type ColumnType = {
  key: 'product_img' | 'product_name' | 'total_sold' | 'total_revenue' | 'id' | 'createdAt';
  label: string;
  render?: (row: any) => React.ReactNode;
};


const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Redux state selectors
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const orderCount = useSelector((state: RootState) => state.order.order) || 0;
  const productCount = useSelector((state: RootState) => state.product.product) || 0;
  const userCount = useSelector((state: RootState) => state.user.user) || 0;
  const orderChartData = useSelector((state: RootState) => state.order.allOrder || []);

  const allProduct = useSelector((state: RootState) =>
    Array.isArray(state.product?.allProduct) ? state.product.allProduct : []
  );
  const allTop = useSelector((state: RootState) => state.top.allTop || [] )

  // State for period & date filtering
  const [startDate, setStartDate] = useState<Date | null>(() => {
    const today = new Date();
    today.setDate(today.getDate() - 6); // Set start date to 6 days ago
    return today;
  });
  const [endDate, setEndDate] = useState<Date | null>(new Date());


  // Format chart data from the provided dataset
  const formattedData = Array.isArray(orderChartData)
    ? orderChartData
        .map((order: any) => ({
          x: new Date(order._id).toLocaleDateString("en-US"), // Format date to MM/DD/YYYY
          y: order.total,
        }))
        .sort((a, b) => new Date(a.x).getTime() - new Date(b.x).getTime()) // Sort by date
    : [];

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        dispatch(startLoading());
        await dispatch(getOrderCount()).unwrap();
        await dispatch(getProductCount()).unwrap();
        await dispatch(getUserCount()).unwrap();
        await dispatch(getTopOrders()).unwrap();
        await dispatch(getAllProduct()).unwrap();

        // Ensure start & end dates are valid
        if (startDate && endDate) {
          await dispatch(
            getOrderChart({
              startDate: startDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
              endDate: endDate.toISOString().split("T")[0],
            })
          ).unwrap();
        }
      
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch dashboard data.");
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchCounts();
  }, [dispatch, startDate, endDate]);


  const formatDateTime = (isoString: string | null | undefined): string => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(date);
  };

  const getProductName = (productId: string) => {
    const product = allProduct.find((p) => p.id === productId);
    return product ? product.product_name : "Unknown Product";
  };


  const columns: ColumnType[] = [
    {
      key: "product_img",
      label: "Product Image",
      render: (row) => (
        <img
          src={row.product_img || "/path/to/default/image.png"} // Fallback to a default image if none is provided
          alt={row.product_name}
          className="w-10 h-10 object-cover rounded-full"
        />
      ),
    },
    { key: "product_name", label: "Product Name", render: (row) => row.product_name || "N/A" },
    { key: "total_sold", label: "Total Sold", render: (row) => row.total_sold },
    { key: "total_revenue", label: "Total Revenue", render: (row) => `₦${row.total_revenue}` },
  ];

  const formattedOrders = useMemo(
    
    () =>
      [...allTop]
        .map((item) => ({
          ...item,
          id: item.product_id, // Ensure each row has a unique `id`
        }))
        .sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA; // Sort descending (newest first)
        }),
    [allTop]
  );
  

  return (
    <div className="space-y-6 w-full">
      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard icon={<FiShoppingCart />} title="Order Count" value={orderCount.toString()} />
        <StatsCard icon={<FiPackage />} title="Product Count" value={productCount.toString()} />
        <StatsCard icon={<FiUsers />} title="User Count" value={userCount.toString()} />
      </div>

      {/* Sales Overview Section */}
      <div className="bg-white p-5 rounded-lg shadow w-full">
        <h2 className="text-lg font-medium mb-4">Sales Overview</h2>

        {/* Date Pickers for Filtering */}
        <div className="flex  gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              className="border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              className="border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* Line Chart */}
        <div className="h-64 w-full">
          {formattedData.length > 0 ? (
            <LineChart data={formattedData} />
          ) : (
            <p className="text-center text-gray-500">No data available for the selected period.</p>
          )}
        </div>

        <div className="w-full">
          <Table data={formattedOrders} columns={columns} pagination={false} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
