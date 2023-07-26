import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSingleProduct = createAsyncThunk(
  "products/productId",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "updateProduct",
  async ({ id, stock }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/products/${id}`, { stock });
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data); 
    }
  }
);

const initialState = {};

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSingleProduct.fulfilled, (state, { payload }) => {
        state.singleProduct = payload;
      })
      .addCase(getSingleProduct.rejected, (state) => {
        return initialState;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(updateProduct.rejected, (state) => {
        return initialState;
      });
  },
});

export const selectSingleProduct = (state) => {
  return state.singleProduct;
};

export default singleProductSlice.reducer;
