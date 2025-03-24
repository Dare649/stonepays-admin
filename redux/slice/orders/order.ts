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
            const response = await axiosInstance.get("order/get_orders");
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Failed to get orders, try again"
            });
        }
    }
)



