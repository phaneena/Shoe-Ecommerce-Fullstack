import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { endPoints } from "../api/endPoints";

export const addOrder=createAsyncThunk("order/addOrder",async(orderData,{rejectWithValue})=>{
    console.log(orderData)
    try{
        const response=await axiosInstance.post(endPoints.ORDER.CREATE_ORDER,orderData)
        console.log(response.data.order)
        return response.data.order
    }
    catch(error){
        return rejectWithValue(error.response?.data?.message ||"Error in place order")
    }
})

export const verifypayment=createAsyncThunk("order/verifypayment",async(paymentData,{rejectWithValue})=>{
    try{
        const response=await axiosInstance.post(endPoints.ORDER.VERIFY_PAYMENT,paymentData)
        console.log(response.data)
        return response.data
    }
    catch(error){
        return rejectWithValue(error.response?.data?.message || "Error in payment verification")
    }
})

export const showOrders= createAsyncThunk(
    'order/showOrders',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(endPoints.ORDER.SHOW_ORDER);
        console.log(response.data.orders)
        return response.data.orders;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Error in get orders");
      }
    }
  );


const orderSlice=createSlice({
    name:"order",
    initialState:{
        orders:[],
        order:null,
        paymentVerified:false,
        loading:false,
        error:null
    },
    extraReducers: (builder) => {
        builder
          .addCase(addOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(addOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.order=action.payload.order;
          })
          .addCase(addOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(verifypayment.pending,(state)=>{
            state.loading=true
            state.error=null
          })
          .addCase(verifypayment.fulfilled,(state,action)=>{
            if (action.payload.paymentVerified) {
                state.paymentVerified = true;
                console.log(action.payload.paymentVerified)
              } else {
                console.error("Payment verification response missing 'paymentVerified'");
              }
            state.loading = false
            // state.paymentVerified=true
            // state.order.paymentVerified=true
          })
          .addCase(verifypayment.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
          })
          .addCase(showOrders.pending,(state)=>{
            state.loading=true
            state.error=null
          })
          .addCase(showOrders.fulfilled,(state,action)=>{
            state.orders = action.payload;
            state.loading=false
          })
          .addCase(showOrders.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
    }
})

export default orderSlice.reducer