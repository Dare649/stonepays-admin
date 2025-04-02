import { createSlice } from "@reduxjs/toolkit";
import {
    createProduct,
    deleteProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    getProductCount
} from "./product";


  
interface ProductData {
    createdAt?: string;
    _id?: string;
    id: string;
    product_name: string;
    product_category: string;
    product_price: number;
    product_description: string;
    product_img: string;
    product_qty: number;
}


interface ProductState {
    createProductStatus:  "idle" | "isLoading" | "succeeded" | "failed";
    updateProductStatus:  "idle" | "isLoading" | "succeeded" | "failed";
    getAllProductStatus:  "idle" | "isLoading" | "succeeded" | "failed";
    deleteProductStatus:  "idle" | "isLoading" | "succeeded" | "failed";
    getProductStatus:  "idle" | "isLoading" | "succeeded" | "failed";
    getProductCountStatus:  "idle" | "isLoading" | "succeeded" | "failed";
    product: ProductData | null;
    allProduct: ProductData[];
    error: string | null;
}


const initialState: ProductState = {
    createProductStatus: "idle",
    updateProductStatus: "idle",
    getProductStatus: "idle",
    getProductCountStatus: "idle",
    getAllProductStatus: "idle",
    deleteProductStatus: "idle",
    product: null,
    allProduct: [],
    error: null,
};


const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // create product
            .addCase(createProduct.pending, (state) => {
                state.createProductStatus = "isLoading";
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.createProductStatus = "succeeded";
            
                // Extract the product data from the response
                const newProduct = action.payload.data;
            
                // Check if the product data is valid before updating the state
                if (newProduct && newProduct._id) {
                    state.allProduct = Array.isArray(state.allProduct)
                        ? [...state.allProduct, newProduct]
                        : [newProduct];
                } else {
                    console.error("Invalid product data received:", action.payload);
                }
            })
            
            
            .addCase(createProduct.rejected, (state, action) => {
                state.createProductStatus = "failed";
                state.error = action.error.message ?? "Failed to create product"
            })


            .addCase(updateProduct.fulfilled, (state, action) => {
                state.updateProductStatus = "succeeded";
                state.allProduct = state.allProduct.map((product) =>
                    product._id === action.payload._id ? action.payload : product
                );
                // Dispatch getAllProduct to refresh the product list
                state.allProduct = state.allProduct.map((product) =>
                    product._id === action.payload._id ? action.payload : product
                );

                // Optionally, update the currently selected product if necessary
                if (state.product?._id === action.payload._id) {
                    state.product = action.payload;
                }

                // Refresh the product list by dispatching the `getAllProduct` action
                // You might want to dispatch this action in the component where the update happens
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.updateProductStatus = "failed";
                state.error = action.error.message ?? "Failed to update product";
            })


            // get product by id
            .addCase(getProduct.pending, (state) => {
                state.getProductStatus = "isLoading";
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.getProductStatus = "succeeded";
                state.product = action.payload;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.getProductStatus = "failed";
                state.error = action.error.message ?? "Failed to get product";
            })

            // get products 
            .addCase(getAllProduct.pending, (state) => {
                state.getAllProductStatus = "isLoading";
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.getAllProductStatus = "succeeded";
                state.allProduct = Array.isArray(action.payload) ? action.payload : [];
            })            
            .addCase(getAllProduct.rejected, (state, action) => {
                state.getAllProductStatus = "failed";
                state.error = action.error.message ?? "Failed to get all products by category";
            })

            // get products count
            .addCase(getProductCount.pending, (state) => {
                state.getProductCountStatus = "isLoading";
            })
            .addCase(getProductCount.fulfilled, (state, action) => {
                state.getProductCountStatus = "succeeded";
                state.product = action.payload;
            })            
            .addCase(getProductCount.rejected, (state, action) => {
                state.getProductCountStatus = "failed";
                state.error = action.error.message ?? "Failed to get all products by category";
            })


            // delete product
            .addCase(deleteProduct.pending, (state) => {
                state.deleteProductStatus = "isLoading";
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.deleteProductStatus = "succeeded";
                state.allProduct = Array.isArray(state.allProduct)
                    ? state.allProduct.filter((log) => log._id !== action.payload)
                    : [];
            
                if (state.product?._id === action.payload) {
                    state.product = null; 
                }
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.deleteProductStatus = "failed";
                state.error = action.error.message ?? "Failed to delete product";
            });
    },
});

export default productSlice.reducer;