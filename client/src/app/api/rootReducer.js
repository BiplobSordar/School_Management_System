import { combineReducers } from '@reduxjs/toolkit'
import { authApi } from './auth.js'
import authReducer from '../features/auth/authSlice.js'

const rootReducer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    auth:authReducer
})

export default rootReducer