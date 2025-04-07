import { createSlice } from "@reduxjs/toolkit";
import { getTotalRevenue } from "./revenue";

interface TotalRevenueState {
    getTotalRevenueStatus: "idle" | "isLoading" | "succeeded" | "failed";
    revenue: number | null;
    error: string | null;
}

const initialState: TotalRevenueState = {
    getTotalRevenueStatus: "idle",
    revenue: null,
    error: null,
};

const revenueSlice = createSlice({
    name: "revenue",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTotalRevenue.pending, (state) => {
                state.getTotalRevenueStatus = "isLoading";
            })
            .addCase(getTotalRevenue.fulfilled, (state, action) => {
                state.getTotalRevenueStatus = "succeeded";
                state.revenue = action.payload;
            })
            .addCase(getTotalRevenue.rejected, (state, action) => {
                state.getTotalRevenueStatus = "failed";
                state.error = action.error.message ?? "Failed to get total revenue";
            });
    },
});

export default revenueSlice.reducer;
