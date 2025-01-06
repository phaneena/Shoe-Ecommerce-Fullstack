import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { endPoints } from "../api/endPoints";

// addToCart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        endPoints.CART.ADD_TO_CART(productId)
      );
      console.log(response.data)
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "error fetching cart"
      );
    }
  }
);

//get cart
export const getCart=createAsyncThunk('cart/getCart',async(_,{rejectWithValue})=>{
    try{
        const response=await axiosInstance.get(endPoints.CART.GET_CART)
        // console.log(response.data.cart.products)
        return response.data.cart.products
    }
    catch(error){
        return rejectWithValue(error.response?.data?.message ||'Error fetching cart')
    }
})

//remove cart
export const removeCart=createAsyncThunk('cart/removeCart',async(productId,{rejectWithValue})=>{
    try{
        await axiosInstance.delete(endPoints.CART.REMOVE_CART(productId))
        console.log(productId)
        return productId
    }
    catch(error){
        return rejectWithValue(error.response?.data?.message ||"Error removing from cart")
    }
})

//update quantity
export const updateCartQuantity=createAsyncThunk('cart/updateCartQuantity',async({productId,quantity},{dispatch,rejectWithValue})=>{
    try{
        const response=await axiosInstance.patch(endPoints.CART.UPDATE_QUANTITY,{productId,quantity})
        await dispatch(getCart())
        return response.data
    }
    catch(error){
        return rejectWithValue(error.response?.data?.message ||"Error uploading cart quantity")
    }
})

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCart: (state) => state.cart = []
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.cart = action.payload.map((item) => ({
        id: item.product._id,
        name: item.product.name,
        price: item.product.price,
        images: item.product.images,
        quantity: item.quantity,
        available: item.product.quantity,
      }));
    })

    //getcart
    .addCase(getCart.pending,(state)=>{
        state.loading=true
        state.error=null
    })
    .addCase(getCart.fulfilled,(state,action)=>{
        state.loading=false
        state.cart = action.payload.map((item) => ({
            id: item.product._id,
            name: item.product.name ,
            price: item.product.price,
            images: item.product.images,
            quantity: item.quantity ,
            available: item.product?.quantity
          }));
          
        console.log(state.cart)

    })
    .addCase(getCart.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
        state.cart = []
    })
    //remove cart
    .addCase(removeCart.fulfilled,(state,action)=>{
        state.loading=false
        state.cart=state.cart.filter((item)=>item.id!==action.payload)
    })
    .addCase(updateCartQuantity.fulfilled,(state)=>{
        state.loading=false
    })
  },
});
export const {setCart}=cartSlice.actions
export default cartSlice.reducer
