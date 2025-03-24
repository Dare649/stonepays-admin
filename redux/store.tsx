import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '@/redux/slice/loadingSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '@/redux/slice/auth/authSlice';
import orderReducer from '@/redux/slice/orders/orderSlice';
import productReducer from "@/redux/slice/product/productSlice";
import categoryReducer from '@/redux/slice/productCategory/productCategorySlice';



const persistConfig = {
    key: 'root',
    storage,
};


const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedOrderReducer = persistReducer(persistConfig, orderReducer);
const persistedProductReducer = persistReducer(persistConfig, productReducer);
const persistedCategoryReducer = persistReducer(persistConfig, categoryReducer);



export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        auth: persistedAuthReducer,
        order: persistedOrderReducer,
        product: persistedProductReducer,
        category: persistedCategoryReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);