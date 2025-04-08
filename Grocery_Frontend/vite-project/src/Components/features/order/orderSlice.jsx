import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const API_URL = "http://127.0.0.1:8000/orders"

export const createOrder = createAsyncThunk(
    //יתקבל גם מזהה ספק ממנו נרצה לבצע הזמנה ורשימת מוצרים
    "orders/createOrder",
    async (orderData, { rejectWithValue }) => {
        try {
            debugger
            const response = await axios.post(API_URL, orderData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
export const getAll = createAsyncThunk(
    "orders/getAll",//אם זה ספק נקבל את ההזמנות שלו אם בעל מכולת את כל ההזמנות ID כן נשלח 
    async (id, { rejectWithValue }) => {
        try {
            debugger
            const response = await axios.get(`${API_URL}?id=${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
export const updateOrder = createAsyncThunk(
    "orders/updateOrder",
    async (id, { rejectWithValue }) => {
        try {
            debugger
            const response = await axios.put(`${API_URL}?id=${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const initionalState = {
    orders: [],
    currentOrder: null,
    status: "",
    error: null,
    statusTypes: {
        PENDING: "בהמתנה",
        IN_PROCESS: "בתהליך",
        COMPLETED: "הושלמה"
    }
};

export const ordersSlice = createSlice({
    name: "orders",
    initialState: initionalState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateOrder.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.orders.findIndex(
                    //במקום לקבל שוב את כל ההזמנות נשנה פה באופן ידני אם הצליח
                    (order) => order.id === action.payload.id
                );
                if (index !== -1) {
                    state.orders[index].status = action.payload.status;
                }
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(createOrder.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.currentOrder=action.payload;
                state.orders.push(action.payload);
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
        builder
            .addCase(getAll.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.orders = action.payload;
            })
            .addCase(getAll.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});
export const { } = ordersSlice.actions;

export default ordersSlice.reducer;