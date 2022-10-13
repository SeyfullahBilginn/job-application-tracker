import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

const initialState = {
  applications: [],
  total: 0,
  isLoading: true,
  error: {
    isError: false,
    message: "",
  },
};

export const getApplications = createAsyncThunk("cart/getApplications", async (userId, thunkAPI) =>
  fetch(`${API_BASE_URL}/users/jobs/${userId}`, {
    method: "GET",
  })
    .then((res) => res.json().then((result) => result))
    .catch((error) => thunkAPI.rejectWithValue(error))
);

const applicationSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeItem: (state, action) => {
      const itemId = action.payload;
      return state.cartItems.filter((item) => item.id !== itemId);
    },
  },
  extraReducers: {
    [getApplications.pending]: (state) => {
      state.isLoading = true;
    },
    [getApplications.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.applications = action.payload;
      state.error = {
        isError: false,
      };
    },
    [getApplications.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = {
        isError: true,
        message: action.payload.message,
      };
    },
  },
});

export const { removeItem } = applicationSlice.actions;

export default applicationSlice.reducer;
