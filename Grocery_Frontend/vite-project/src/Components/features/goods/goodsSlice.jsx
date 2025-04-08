import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/goods"
//עמוד זה ישמש רק לבעל המכולת כאשר ירצה להחזיר סחורות לפי ספק
//או לספק כדי להכניס מוצרים בתחילה
export const getAll = createAsyncThunk(
    "orders/getAll",
    async (user_id, { rejectWithValue }) => {
        try {
            debugger
            const response = await axios.post(API_URL, { user_id });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const initialState = {
    goods: [],
    status:"",
    error:"",
}

export const goodsSlice = createSlice({
    name: 'goods',
    initialState,
    reducers: {
        addGoodsLocal: (state, action) => {//ישמש כשומר מקומי לכל הסחורות שהספק מעדכן
            state.goods.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAll.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.goods=action.payload
            })
            .addCase(getAll.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
        },
    })


export const { addGoodsLocal} = goodsSlice.actions

export default goodsSlice.reducer