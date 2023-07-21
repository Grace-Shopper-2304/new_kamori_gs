import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const getAllProducts = createAsyncThunk('getAllProducts', async () => {
  try {
    console.log('inside thunk');
    const {data} = await axios.get(`/api/products`);
    return data
  } catch (err) {
    console.log(err)
  }
})

const allProductsSlice = createSlice({
  name: 'products',
  initialState: {
    products: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllProducts.fulfilled, (state, {payload}) => {
      state.products = payload
    })
  }
})

export const selectProducts = state => {
  return state.products.products
}

export default allProductsSlice.reducer
