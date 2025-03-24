import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

interface Category {
    category_name: string;
    category_description: string;     
}


export const createCategory = createAsyncThunk(
    "productCategory/createCategory",
    async (data: Category, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/product-category/create_product_category", data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Failed to create product category, try again"
            });
        }
    }
);


// update product
export const updateCategory = createAsyncThunk(
    "productCategory/updateCategory",
    async ({ id, data}: { id: string; data: Category}, { rejectWithValue}) => {
        try {
            const response = await axiosInstance.put(`/product-category/update_product_category/${id}`, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Failed to update product category, try again"
            });   
        }
    }
);


export const getCategory = createAsyncThunk(
    "productCategory/getCategory",
    async (categoryId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/product-category/get_product_category/${categoryId}`);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


export const deleteCategory = createAsyncThunk<string, string, { rejectValue: {message: string}}>(
    "productCategory/deleteCategory",
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/product-category/delete_product_category/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Failed to delete product category, try again"
            });
        }
    }
);


export const getAllCategory = createAsyncThunk(
    "productCategory/getAllCategory",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/product-category/get_product_categoryies`);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Failed to get all product categories, try again"
            });
        }
    }
)