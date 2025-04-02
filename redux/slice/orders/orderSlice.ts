import { createSlice } from "@reduxjs/toolkit";
import {
    getAllOrder,
    getOrder,
    getOrderCount,
    getOrderChart,
    getTopOrders,
    deleteOrder
} from "./order";

interface UserDetails {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    user_img: string;
}


interface ProductDetails {
    product_name: string;
    product_category: string[];
}
  
interface Product {
    product_id: string;
    product_details: ProductDetails;
    quantity: number;
    price: number;
    _id: string;
}
  
interface OrderData {
    product_id?: string;
    user_details: UserDetails;
    products: Product[];
    status: string;
    total_price: number;
    transaction_reference: string | null;
    payment_method: string;
    payment_date: string | null;
    _id?: string;
    createdAt?: string;
}

interface OrderState {
    getOrderStatus: "idle" | "isLoading" | "succeeded" | "failed";
    getAllOrderStatus: "idle" | "isLoading" | "succeeded" | "failed";
    getOrderCountStatus: "idle" | "isLoading" | "succeeded" | "failed";
    getOrderChartStatus: "idle" | "isLoading" | "succeeded" | "failed";
    getTopOrdersStatus: "idle" | "isLoading" | "succeeded" | "failed";
    deleteOrderStatus: "idle" | "isLoading" | "succeeded" | "failed";
    order: OrderData | null;
    allOrder: OrderData[];
    error: string | null;
}



const initialState: OrderState = {
    getAllOrderStatus: "idle",
    getOrderStatus: "idle",
    getOrderCountStatus: "idle",
    getOrderChartStatus: "idle",
    getTopOrdersStatus: "idle",
    deleteOrderStatus: "idle",
    order: null,
    allOrder: [],
    error: null,
};


const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder

            // get order
            .addCase(getOrder.pending, (state) => {
                state.getOrderStatus = "isLoading";
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.getOrderStatus = "succeeded";
                state.order = action.payload;
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.getOrderStatus = "failed";
                state.error = action.error.message ?? "Failed to get order";
            })

            // get order count
            .addCase(getOrderCount.pending, (state) => {
                state.getOrderCountStatus = "isLoading";
            })
            .addCase(getOrderCount.fulfilled, (state, action) => {
                state.getOrderCountStatus = "succeeded";
                state.order = action.payload;
            })
            .addCase(getOrderCount.rejected, (state, action) => {
                state.getOrderCountStatus = "failed";
                state.error = action.error.message ?? "Failed to get order";
            })

            // get all orders
            .addCase(getAllOrder.pending, (state) => {
                state.getAllOrderStatus = "isLoading";
            })
            .addCase(getAllOrder.fulfilled, (state, action) => {
                state.getAllOrderStatus = "succeeded";
                state.allOrder = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(getAllOrder.rejected, (state, action) => {
                state.getAllOrderStatus = "failed";
                state.error = action.error.message ?? "Failed to get orders";
            })


            // get all order charts
            .addCase(getOrderChart.pending, (state) => {
                state.getOrderChartStatus = "isLoading";
            })
            .addCase(getOrderChart.fulfilled, (state, action) => {
                state.getOrderChartStatus = "succeeded";
                if (Array.isArray(action.payload)) {
                    state.allOrder = action.payload; // Assign only if it's an array
                } else {
                    console.error("Unexpected payload for order chart:", action.payload);
                }
            })            
            .addCase(getOrderChart.rejected, (state, action) => {
                state.getAllOrderStatus = "failed";
                state.error = action.error.message ?? "Failed to get orders";
            })


            // get top 10 orders
            .addCase(getTopOrders.pending, (state) => {
                state.getTopOrdersStatus = "isLoading";
            })
            .addCase(getTopOrders.fulfilled, (state, action) => {
                console.log("🚀 API Response for getTopOrders:", action.payload); // Debugging log
                state.getTopOrdersStatus = "succeeded";
            
                // Access data inside the payload
                if (Array.isArray(action.payload)) {
                    state.allOrder = action.payload; // Set the array from the 'data' property
                } else {
                    console.error("❌ Unexpected payload for getTopOrders:", action.payload);
                }
            })
            
                     
            .addCase(getTopOrders.rejected, (state, action) => {
                state.getTopOrdersStatus = "failed";
                state.error = action.error.message ?? "Failed to get orders";
            })

            // delete order
            .addCase(deleteOrder.pending, (state) => {
                state.deleteOrderStatus = "isLoading";
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.deleteOrderStatus = "succeeded";
                state.allOrder = Array.isArray(state.allOrder)
                    ? state.allOrder.filter((log) => log._id !== action.payload)
                    : [];
            
                if (state.order?._id === action.payload) {
                    state.order = null; 
                }
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.deleteOrderStatus = "failed";
                state.error = action.error.message ?? "Failed to delete order";
            });
    },
});

export default orderSlice.reducer;
