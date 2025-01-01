import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { endPoints } from "../api/endPoints";

//get favourite
export const getFavorite = createAsyncThunk(
  "favorite/getFavorite",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(endPoints.FAVORITE.GET_FAVORITE);
      console.log(response.data);
      return response.data.wishlist || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching favourite"
      );
    }
  }
);

//Add and Remove from favorite
export const changeFavorite = createAsyncThunk(
  "favorite/changeFavorite",
  async (productId, { rejectWithValue }) => {
    console.log(productId);
    try {
      const response = await axiosInstance.post(
        endPoints.FAVORITE.ADD_FAVORITE(productId)
      );
      console.log(productId);
      console.log(response.data);
      return response.data.favourites.wishlist;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error adding to favourite"
      );
    }
  }
);

const favouriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favorite: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.favorite = action.payload;
      })
      .addCase(getFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changeFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.favorite = action.payload;
      })
      .addCase(changeFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default favouriteSlice.reducer;
