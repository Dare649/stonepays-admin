import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";


export const getTotalRevenue = createAsyncThunk(
    "order/getTotalRevenue",
    async(_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/order/total_revenue");
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Failed to get total revenue, try again"
            });
        }
    }
)