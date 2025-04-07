import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";


interface UserDetails {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    user_img: string;
}


interface ProductDetails {
    product_name: string;
    product_category: string;
}
  
interface Product {
    product_id: string;
    product_details: ProductDetails;
    quantity: number;
    price: number;
    _id: string;
}


interface OrderChartParams {
    startDate?: string; 
    endDate?: string;
  }
  
interface OrderData {
    user_details: UserDetails;
    products: Product[];
    status: string;
    total_price: number;
    transaction_reference: string | null;
    payment_method: string;
    payment_date: string | null;
    _id: string;
    createdAt: string;
    payment_status: string;
}


export const getOrder = createAsyncThunk(
    "order/getOrder",
    async (orderId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/order/get_order/${orderId}`);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


export const getAllOrder = createAsyncThunk(
    "order/getAllOrders",
    async(_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/order/get_orders");
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Failed to get orders, try again"
            });
        }
    }
)


export const getOrderCount = createAsyncThunk(
    "order/getOrderCount",
    async(_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/order/total_count");
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Failed to get order count, try again"
            });
        }
    }
)


export const getTopOrders = createAsyncThunk(
    "order/getTopOrders",
    async(_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/order/top_sold");
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Failed to get order count, try again"
            });
        }
    }
)



export const getOrderChart = createAsyncThunk(
    "order/getOrderChart",
    async ({ startDate, endDate }: OrderChartParams, { rejectWithValue }) => {
      try {
       
        // Validate date range
        if (!startDate || !endDate) {
          return rejectWithValue({ message: "Start date and end date are required." });
        }
  
        // Construct query parameters
        const queryParams = new URLSearchParams({  startDate, endDate });
  
        const response = await axiosInstance.get(`/order/by_period?${queryParams.toString()}`);
        
        return response.data?.data ?? []; // Ensure it always returns an array
      } catch (error: any) {
        return rejectWithValue({
          message:
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch order chart data. Please try again.",
        });
      }
    }
  
)


export const deleteOrder = createAsyncThunk<string, string, { rejectValue: {message: string}}>(
    "order/deleteOrder",
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/order/delete_order/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Failed to delete user, try again"
            });
        }
    }
);


export const updateOrderStatus = createAsyncThunk<string, string, { rejectValue: {message: string}}>(
    "order/updateOrderStatus",
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstance.put(`/order/update_order_status/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Failed to delete user, try again"
            });
        }
    }
);
  


