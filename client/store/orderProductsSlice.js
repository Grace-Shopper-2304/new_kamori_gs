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

export const incrementProduct = createAsyncThunk(
    "incrementCartProduct",
    async (id) => {
      try {
        const {data} = await axios.put(`/api/orderProducts/${id}/increase`);
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  );
  
  export const decrementProduct = createAsyncThunk(
    "decrementCartProduct",
    async (id) => {
      try {
        const {data} = await axios.put(`/api/orderProducts/${id}/decrease`);
        return data
      } catch (err) {
        console.log(err);
      }
    }
  );

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
    .addCase(incrementProduct.fulfilled, (state, { payload }) => { // Now payload is the updated orderProduct
        const updatedOrderProduct = state.orderProducts.find(item => item.id === payload.id);
        if (updatedOrderProduct) {
          updatedOrderProduct.quantity = payload.quantity;
        }
      })
      .addCase(decrementProduct.fulfilled, (state, { payload }) => {
        const updatedOrderProduct = state.orderProducts.find(item => item.id === payload.id);
        if (updatedOrderProduct) {
          updatedOrderProduct.quantity = payload.quantity;
        }
      });
  }
});

export const selectOrderProducts = state => {
  return state.orderProducts.orderProducts
}

export default orderProductsSlice.reducer
