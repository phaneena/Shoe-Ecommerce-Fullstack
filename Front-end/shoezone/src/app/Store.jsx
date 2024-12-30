import { configureStore } from "@reduxjs/toolkit";
import productSlice from '../features/productSlice'
import cartSlice from '../features/cartSlice'

export default configureStore({
    reducer:{
        product:productSlice,
        cart: cartSlice,
    }
})