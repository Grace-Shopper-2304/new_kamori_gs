import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
  try {
    const { data } = await axios.get(`/api/users/`);
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const addUser = createAsyncThunk(
  "addUser",
  async ({ username, email, name, password, address, phone }) => {
    const { data } = await axios.post("/api/users", {
      username,
      email,
      name,
      password,
      address,
      phone,
    });
    return data;
  }
);

const allUserSlice = createSlice({
  name: "allUsers",
  initialState: {
    users: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.users = payload;
      })
      .addCase(addUser.fulfilled, (state, { payload }) => {
        state.users.push(payload);
      });
  },
});

export const selectAllUsers = (state) => {
  return state.users;
};

export default allUserSlice.reducer;
