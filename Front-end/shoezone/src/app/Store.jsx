import { configureStore } from "@reduxjs/toolkit";
import productSlice from '../features/productSlice'
import cartSlice from '../features/cartSlice'
import favouriteSlice from '../features/favouriteSlice'

export default configureStore({
    reducer:{
        product:productSlice,
        cart: cartSlice,
        favorite:favouriteSlice,
    }
})