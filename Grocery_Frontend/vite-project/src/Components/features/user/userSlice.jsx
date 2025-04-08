import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/users/"
export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData, { rejectWithValue }) => {
    //צריך לשלוח : שם, טלפון, שם חברה(לא חובה), רשימת מוצרים -שם, כמות מינימלית
    try {
      debugger
      const response = await axios.post(API_URL, userData);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(response);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const getAll = createAsyncThunk(
  "users/getAll",
  async (_, { rejectWithValue }) => {
    try {
      debugger
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const userSignin = createAsyncThunk(
  "user/signin",
  async (userSigninData, { rejectWithValue }) => {
    try {
      debugger
      console.log(userSigninData); 
      const response = await axios.get(API_URL,userSigninData);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(response);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
const initialState = {
  users: [],//בשימוש רק אם זה בעל המכולת
  currentUser: null,//פה יהיה אוביקט
  goods: [],
  error: "",
  status: ""
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getAll.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(userSignin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userSignin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
      })
      .addCase(userSignin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
})

export const { } = userSlice.actions

export default userSlice.reducer