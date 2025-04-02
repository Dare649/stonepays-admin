import { createSlice } from "@reduxjs/toolkit";
import {
    deleteUser,
    getAllUser,
    getUser,
    getUserCount
} from "./users";


  
interface UserData {
    createdAt?: string;
    _id?: string;
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    user_img: string;
    password: string;
    is_active: boolean;
    is_verified: boolean;
}


interface UserState {
    getAllUserStatus:  "idle" | "isLoading" | "succeeded" | "failed";
    deleteUserStatus:  "idle" | "isLoading" | "succeeded" | "failed";
    getUserStatus:  "idle" | "isLoading" | "succeeded" | "failed";
    getUserCountStatus:  "idle" | "isLoading" | "succeeded" | "failed";
    user: UserData | null;
    allUser: UserData[];
    error: string | null;
}


const initialState: UserState = {
    getUserStatus: "idle",
    getUserCountStatus: "idle",
    getAllUserStatus: "idle",
    deleteUserStatus: "idle",
    user: null,
    allUser: [],
    error: null,
};


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder

            // get user by id
            .addCase(getUser.pending, (state) => {
                state.getUserStatus = "isLoading";
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.getUserStatus = "succeeded";
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.getUserStatus = "failed";
                state.error = action.error.message ?? "Failed to get user";
            })

            // get users 
            .addCase(getAllUser.pending, (state) => {
                state.getAllUserStatus = "isLoading";
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.getAllUserStatus = "succeeded";
                state.allUser = Array.isArray(action.payload) ? action.payload : [];
            })            
            .addCase(getAllUser.rejected, (state, action) => {
                state.getAllUserStatus = "failed";
                state.error = action.error.message ?? "Failed to get all users by category";
            })

            // get users count
            .addCase(getUserCount.pending, (state) => {
                state.getUserCountStatus = "isLoading";
            })
            .addCase(getUserCount.fulfilled, (state, action) => {
                state.getUserCountStatus = "succeeded";
                state.user = action.payload;
            })            
            .addCase(getUserCount.rejected, (state, action) => {
                state.getUserCountStatus = "failed";
                state.error = action.error.message ?? "Failed to get all users by category";
            })


            // delete user
            .addCase(deleteUser.pending, (state) => {
                state.deleteUserStatus = "isLoading";
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.deleteUserStatus = "succeeded";
                state.allUser = Array.isArray(state.allUser)
                    ? state.allUser.filter((log) => log._id !== action.payload)
                    : [];
            
                if (state.user?._id === action.payload) {
                    state.user = null; 
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.deleteUserStatus = "failed";
                state.error = action.error.message ?? "Failed to delete user";
            });
    },
});

export default userSlice.reducer;