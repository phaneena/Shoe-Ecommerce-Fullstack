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
      console.log(response);
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
    loading: false,
    error: null,
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
          console.log(state.products),
          (state.pagination = action.payload.pagination);
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export default productSlice.reducer;
