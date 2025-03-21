import { combineReducers } from '@reduxjs/toolkit'
import { authApi } from './auth.js'
import authReducer from '../features/auth/authSlice.js'
import { adminApi } from './adminApi.js'


const rootReducer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [adminApi.reducerPath]:adminApi.reducer,
   
    auth:authReducer
})

export default rootReducer
