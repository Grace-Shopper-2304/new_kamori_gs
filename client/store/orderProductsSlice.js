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

  export const removeFromCart = createAsyncThunk("removeFromCart", async (id) => {
    const { data } = await axios.delete(`/api/orderProducts/${id}`);
    return data;
  });

  export const addToCart = createAsyncThunk("addToCart",
  async ({ userId, productId, price, orderId, quantity }) => {
    try {
      const { data } = await axios.post(`/api/orderProducts`, {
        userId,
        productId,
        price,
        orderId,
        quantity
      });
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  });

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
      })
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        // I notice you have some console.logs and sections of commented-out code here... I recommend doing one PR after everything else is merged to remove these, in case prospective employers decide to check out the code or you want to use it for future reference.
        console.log('payload!!', payload)
        state.orderProducts.push(payload);
      })
      .addCase(removeFromCart.fulfilled, (state, { payload }) => {
        state.orderProducts = state.orderProducts.filter((product) => product.id !== payload.id);
      })
  }
});

export const selectOrderProducts = state => {
  return state.orderProducts.orderProducts
}

export default orderProductsSlice.reducer
