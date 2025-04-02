import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";


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