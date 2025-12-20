import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";

 export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, // referring to our apiSlice which we created
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware), 
    devTools: true 
 })