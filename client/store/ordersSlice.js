import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

// this returns all orders for a specific user
export const getOrders = createAsyncThunk('getOrders', async (id) => {
    try {
      const {data} = await axios.get(`/api/orders/user/${id}`);
    return data
  } catch (err) {
    console.log(err)
  }
})

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getOrders.fulfilled, (state, {payload}) => {
      state.orders = payload
    })
  }
})

export const selectOrders = state => {
  return state.orders.orders
}

export default ordersSlice.reducer
