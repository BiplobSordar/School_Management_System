import { configureStore } from '@reduxjs/toolkit'


import { setupListeners } from '@reduxjs/toolkit/query'
import rootReducer from './api/rootReducer.js'
import { authApi } from './api/auth.js'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})


// const initializeApp = async () => {
//   await store.dispatch(authApi.endpoints.loadUser.initiate({}, { forceRefetch: true }))
// }
// initializeApp()


// setupListeners(store.dispatch)