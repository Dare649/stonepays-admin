import { createSlice } from "@reduxjs/toolkit";
import {
    getAllOrder,
    getOrder
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
    order: OrderData | null;
    allOrder: OrderData[];
    error: string | null;
}



const initialState: OrderState = {
    getAllOrderStatus: "idle",
    getOrderStatus: "idle",
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
    },
});

export default orderSlice.reducer;
