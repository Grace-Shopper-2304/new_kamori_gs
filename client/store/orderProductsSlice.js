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

  export const addToCart = createAsyncThunk(
    'addToCart',
    async ({ userId, productId, price, orderId, quantity }) => {
      try {
        const { data } = await axios.post(`/api/orderProducts`, {
          userId,
          productId,
          price,
          orderId,
          quantity,
        });
        return data;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  );

  export const deleteAllCart = createAsyncThunk("deleteAllCart", async () => {
    const {data} = await axios.delete('/api/orderProducts/destroy');
    return data;
  });
  
  export const updateProductQuantities = createAsyncThunk("updateProductQuantities", async (id) => {
    const {data} = await axios.put(`/api/products/${id}/update`);
    return data;
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
        if (payload.userId) {
          // If the payload contains a valid userId, update the state for authorized users
          state.orderProducts.push(payload);
        } else {
          // For unauthorized users, handle cart items in local storage
          const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
          const existingProduct = storedProducts.find((p) => p.id === payload.productId);
  
          if (existingProduct) {
            // If the product is already in the cart, update the quantity
            existingProduct.quantity++;
          } else {
            // Otherwise, add the product to the cart
            storedProducts.push({
              id: payload.productId,
              price: payload.price,
              quantity: 1,
            });
          }
          // Update local storage
          localStorage.setItem('products', JSON.stringify(storedProducts));
        }
      })
      .addCase(removeFromCart.fulfilled, (state, { payload }) => {
        state.orderProducts = state.orderProducts.filter((product) => product.id !== payload.id);
      })
      .addCase(deleteAllCart.fulfilled, (state, {payload}) => {
        state.orderProducts = [];
      })
  }
});

export const selectOrderProducts = state => {
  return state.orderProducts.orderProducts
}

export default orderProductsSlice.reducer
