import { configureStore } from "@reduxjs/toolkit";
import productSlice from '../features/productSlice'
import cartSlice from '../features/cartSlice'
import favouriteSlice from '../features/favouriteSlice'
import orderSlice from "../features/orderSlice"
import adminSlice from "../features/adminSlice"
import authSlice from "../features/authSlice"

export default configureStore({
    reducer:{
        product:productSlice,
        cart: cartSlice,
        favorite:favouriteSlice,
        order:orderSlice,
        user:adminSlice,
        auth:authSlice
    }
})