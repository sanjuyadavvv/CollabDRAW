import { configureStore } from '@reduxjs/toolkit'
import UserReducer from '../features/userSlice.js'
export const Store=configureStore({
    reducer:{user:UserReducer},
})
