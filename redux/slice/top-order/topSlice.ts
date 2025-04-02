import { createSlice } from "@reduxjs/toolkit";
import { getTopOrders } from "./top";


interface TopOrderData {
    product_id: string;
    product_name: string;
    total_sold: number;
    total_revenue: string;
    product_img: string;
    createdAt?: string;
}

interface TopOrderState {
    getTopOrdersStatus: "idle" | "isLoading" | "succeeded" | "failed";
    top: TopOrderData | null;
    allTop: TopOrderData[];
    error: string | null;
}



const initialState: TopOrderState = {
    getTopOrdersStatus: "idle",
    top: null,
    allTop: [],
    error: null,
};



const topSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder

            // get top 10 orders
            .addCase(getTopOrders.pending, (state) => {
                state.getTopOrdersStatus = "isLoading";
            })
            .addCase(getTopOrders.fulfilled, (state, action) => {
                console.log("🚀 API Response for getTopOrders:", action.payload); // Debugging log
                state.getTopOrdersStatus = "succeeded";
            
                // Access data inside the payload
                if (Array.isArray(action.payload)) {
                    state.allTop = action.payload; // Set the array from the 'data' property
                } else {
                    console.error("❌ Unexpected payload for getTopOrders:", action.payload);
                }
            })
            
                     
            .addCase(getTopOrders.rejected, (state, action) => {
                state.getTopOrdersStatus = "failed";
                state.error = action.error.message ?? "Failed to get orders";
            })
    },
});

export default topSlice.reducer;