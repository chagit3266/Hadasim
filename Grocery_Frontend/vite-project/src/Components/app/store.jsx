import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import goodsReducer from '../features/goods/goodsSlice'
import orderReducer from '../features/order/orderSlice'

export const store = configureStore({
  reducer: {
    user:userReducer,
    goods:goodsReducer,
    order:orderReducer
  },
})