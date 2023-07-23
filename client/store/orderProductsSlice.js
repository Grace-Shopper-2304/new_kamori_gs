import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

// this returns all products in a certain order
export const getOrderProducts = createAsyncThunk('getOrderProcuts', async (id) => {
    try {
      const {data} = await axios.get(`/api/orders/${id}/orderProducts`);
    return data
  } catch (err) {
    console.log(err)
  }
})

const orderProductsSlice = createSlice({
  name: 'orderProducts',
  initialState: {
    orderProducts: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getOrderProducts.fulfilled, (state, {payload}) => {
      state.orderProducts = payload
    })
  }
})

export const selectOrderProducts = state => {
  return state.orderProducts.orderProducts
}

export default orderProductsSlice.reducer
