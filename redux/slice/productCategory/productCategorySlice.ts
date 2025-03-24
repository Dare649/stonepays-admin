import { createSlice } from "@reduxjs/toolkit";
import {
    createCategory,
    deleteCategory,
    getAllCategory,
    getCategory,
    updateCategory
} from "./productCategory";

interface Category {
    createdAt?: string;
    _id?: string;
    id: string;
    category_name: string;
    category_description: string;     
}


interface CategoryState {
    createCategoryStatus:  "idle" | "isLoading" | "succeeded" | "failed";
    updateCategoryStatus:  "idle" | "isLoading" | "succeeded" | "failed";
    getAllCategoryStatus:  "idle" | "isLoading" | "succeeded" | "failed";
    deleteCategoryStatus:  "idle" | "isLoading" | "succeeded" | "failed";
    getCategoryStatus:  "idle" | "isLoading" | "succeeded" | "failed";
    category: Category | null;
    allCategory: Category[];
    error: string | null;
}

const initialState: CategoryState = {
    createCategoryStatus: "idle",
    updateCategoryStatus: "idle",
    getCategoryStatus: "idle",
    getAllCategoryStatus: "idle",
    deleteCategoryStatus: "idle",
    category: null,
    allCategory: [],
    error: null,
};


const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // create product
            .addCase(createCategory.pending, (state) => {
                state.createCategoryStatus = "isLoading";
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.createCategoryStatus = "succeeded";
                state.allCategory = Array.isArray(state.allCategory) ? [...state.allCategory, action.payload] : [action.payload];
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.createCategoryStatus = "failed";
                state.error = action.error.message ?? "Failed to create product category"
            })


            // update product
            .addCase(updateCategory.pending, (state) => {
                state.updateCategoryStatus = "isLoading";
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.updateCategoryStatus = "succeeded";
                state.allCategory = Array.isArray(state.allCategory) ? state.allCategory.map((log) => log._id === action.payload
            ._id ? action.payload : log) : [action.payload];

            if (state.category?._id === action.payload._id) {
                state.category = action.payload;
            }
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.updateCategoryStatus = "failed";
                state.error = action.error.message ?? "Failed to update category";
            })


            // get product by id
            .addCase(getCategory.pending, (state) => {
                state.getCategoryStatus = "isLoading";
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.getCategoryStatus = "succeeded";
                state.category = action.payload;
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.getCategoryStatus = "failed";
                state.error = action.error.message ?? "Failed to get category";
            })

     
            .addCase(getAllCategory.pending, (state) => {
                state.getAllCategoryStatus = "isLoading";
            })
            .addCase(getAllCategory.fulfilled, (state, action) => {
                state.getAllCategoryStatus = "succeeded";
                state.allCategory = Array.isArray(action.payload) ? action.payload : [];
            })            
            .addCase(getAllCategory.rejected, (state, action) => {
                state.getAllCategoryStatus = "failed";
                state.error = action.error.message ?? "Failed to get all products by category";
            })


            // delete product
            .addCase(deleteCategory.pending, (state) => {
                state.deleteCategoryStatus = "isLoading";
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.deleteCategoryStatus = "succeeded";
                state.allCategory = Array.isArray(state.allCategory)
                    ? state.allCategory.filter((log) => log._id !== action.payload)
                    : [];
            
                if (state.category?._id === action.payload) {
                    state.category = null; 
                }
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.deleteCategoryStatus = "failed";
                state.error = action.error.message ?? "Failed to delete category";
            });
    },
});

export default categorySlice.reducer;