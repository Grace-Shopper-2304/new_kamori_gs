import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const getSingleProduct = createAsyncThunk(
  'products/productId',
  async id => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      console.log('data!', data)
      return data
    } catch (err) {
      console.log(err)
    }
  }
)

export const updateProduct = createAsyncThunk(
  'updateProduct',
  async ({id, stock}) => {
    try {
      const {data} = await axios.put(`/api/products/${id}`, {
        stock
      })
      return data
    } catch (err) {
      console.log(err)
    }
  }
)

const initialState = {}

const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getSingleProduct.fulfilled, (state, {payload}) => {
       state.singleProduct = payload
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        return action.payload
      })
  }
})

export const selectSingleProduct = state => {
  return state.singleProduct
}

export default singleProductSlice.reducer
