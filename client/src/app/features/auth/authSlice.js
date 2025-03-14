import { authApi } from '@/app/api/auth'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isAuthenticated: false,
    loading:true
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.user = action.payload,
                state.isAuthenticated = true

        },
        userLoggedOut: (state) => {
            state.user = null,
                state.isAuthenticated = false
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.loadUser.matchPending, (state) => {
          state.loading = true;
        });
        builder.addMatcher(authApi.endpoints.loadUser.matchFulfilled, (state, action) => {
          state.user = action.payload;
          state.isAuthenticated = true;
          state.loading = false; // ✅ Set loading to false when done
        });
        builder.addMatcher(authApi.endpoints.loadUser.matchRejected, (state) => {
          state.isAuthenticated = false;
          state.loading = false;
        });
      },
})

// Action creators are generated for each case reducer function
export const { userLoggedIn, userLoggedOut } = authSlice.actions

export default authSlice.reducer