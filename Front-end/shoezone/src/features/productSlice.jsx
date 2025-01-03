import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { endPoints } from "../api/endPoints";

//fetch products
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (
    { categories = null, page = 1, search = null },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        endPoints.PRODUCTS.GET_PRODUCTS,
        { params: { categories, page, search } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "error fetching products"
      );
    }
  }
);

//add products
export const addproduct=createAsyncThunk("products/addproduct",async(newProduct,{rejectWithValue})=>{
    try{
        const response=await axiosInstance.post(endPoints.PRODUCTS.ADD_PRODUCTS,newProduct)
        console.log(response.data)
        return response.data
    }
    catch(error){
        return rejectWithValue(error.response?.data?.message || error.message || "Error adding product")
    }
})

//delete Product
export const deleteProduct=createAsyncThunk("products/deleteProduct",async(productId,{rejectWithValue})=>{
    try{
        await axiosInstance.delete(endPoints.PRODUCTS.DELETE_PRODUCT(productId))
        return productId
    }
    catch(error){
        return rejectWithValue(error.response?.data?.message ||error.message || "Error deleting product")
    }
})


//edit Product
export const updateProduct=createAsyncThunk("products/updateProduct",async(data,{rejectWithValue})=>{
    console.log(data)
    try{
        const response=await axiosInstance.put(endPoints.PRODUCTS.EDIT_PRODUCT,data)
        console.log(response.data)
        return response.data
    }
    catch(error){
        return rejectWithValue(error.response?.data?.message || error.message ||"Error updating Product")
    }
})


const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    pagination: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
    },
    categories:[],
    loading: false,
    error: null,
  },
  reducers:{
    setCategory: (state, action) => {
        state.categories = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      //fetch products
      .addCase(getAllProducts.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        (state.loading = false),
          (state.products = action.payload.product),
          (state.pagination = action.payload.pagination);
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      //add product
      .addCase(addproduct.pending,(state)=>{
        state.loading=true
        state.error=null
      })
      .addCase(addproduct.fulfilled,(state,action)=>{
        state.loading=false
        state.products.push(action.payload)
      })
      .addCase(addproduct.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
      })
      //delete
      .addCase(deleteProduct.pending,(state)=>{
        state.loading=true
        state.error=null
      })
      .addCase(deleteProduct.fulfilled,(state,action)=>{
        state.loading=false
        state.products=state.products.filter((product)=>product._id!==action.payload)
      })
      .addCase(deleteProduct.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
      })
      //update
      .addCase(updateProduct.pending,(state)=>{
        state.loading=true
        state.error=null
      })
      .addCase(updateProduct.fulfilled,(state,action)=>{
        state.loading=false
        state.products=state.products.map((product)=>product._id=== action.payload._id ? action.payload : product)
      })
      .addCase(updateProduct.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
      })
  },
});
export const { setCategory } = productSlice.actions;
export default productSlice.reducer;



