import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSingleProduct = createAsyncThunk(
  'products/productId',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data); // Returning the error data
    }
  }
);

export const updateProduct = createAsyncThunk(
  'updateProduct',
  async ({ id, stock }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/products/${id}`, { stock });
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data); // Returning the error data
    }
  }
);

const initialState = {};

const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getSingleProduct.rejected, (state) => {
        // Clear the state on error
        return initialState;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(updateProduct.rejected, (state) => {
        // Clear the state on error
        return initialState;
      });
  },
});

export const selectSingleProduct = (state) => {
  return state.singleProduct;
};

export default singleProductSlice.reducer;
