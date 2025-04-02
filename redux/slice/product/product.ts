import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

  
interface Product {
    product_name: string;
    product_category: string;
    product_price: number;
    product_description: string;
    product_img: string;
    product_qty: number;
}

export const createProduct = createAsyncThunk(
    "product/createProduct",
    async (data: Product, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/product/create_product", data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Failed to create product, try again"
            });
        }
    }
);


// update product
export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async ({ id, data}: { id: string; data: Product}, { rejectWithValue}) => {
        try {
            const response = await axiosInstance.put(`/product/update_product/${id}`, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Failed to update product, try again"
            });   
        }
    }
);


export const getProduct = createAsyncThunk(
    "product/getProduct",
    async (productId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/product/get_product/${productId}`);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


export const deleteProduct = createAsyncThunk<string, string, { rejectValue: {message: string}}>(
    "product/deleteProduct",
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/product/delete_product/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Failed to delete product, try again"
            });
        }
    }
);


export const getAllProduct = createAsyncThunk(
    "product/getAllProduct",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/product/get_products`);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Failed to get products, try again"
            });
        }
    }
)


export const getProductCount = createAsyncThunk(
    "product/getProductCount",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/product/total_count`);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Failed to get products counts, try again"
            });
        }
    }
)