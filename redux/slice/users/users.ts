import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";


  
interface UserData {
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    user_img: string;
    password: string;
    is_active: boolean;
    is_verified: boolean;
}




// update user
export const updateUser = createAsyncThunk(
    "users/updateUser",
    async ({ id, data}: { id: string; data: UserData}, { rejectWithValue}) => {
        try {
            const response = await axiosInstance.put(`/users/update_user/${id}`, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Failed to update user, try again"
            });   
        }
    }
);


export const getUser = createAsyncThunk(
    "user/getUser",
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/users/get_user/${userId}`);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


export const deleteUser = createAsyncThunk<string, string, { rejectValue: {message: string}}>(
    "user/deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/users/delete_user/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Failed to delete user, try again"
            });
        }
    }
);


export const getAllUser = createAsyncThunk(
    "user/getAllUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/users/get_users`);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Failed to get users, try again"
            });
        }
    }
)


export const getUserCount = createAsyncThunk(
    "user/getUserCount",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/users/total_count`);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Failed to get users counts, try again"
            });
        }
    }
)