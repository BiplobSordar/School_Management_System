import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn, userLoggedOut } from '../features/auth/authSlice';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/v1/auth',
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        adminRegistration: builder.mutation({
            query: (adminData) => ({
                url: '/register/admin',
                method: 'POST',
                body: adminData,
            }),
        }),
        studentRegistration: builder.mutation({
            query: (studentData) => ({
                url: '/register/student',
                method: 'POST',
                body: studentData,
            }),
        }),
        teacherRegistration: builder.mutation({
            query: (teacherData) => ({
                url: '/register/teacher',
                method: 'POST',
                body: teacherData,
            }),
        }),
        parentRegistration: builder.mutation({
            query: (parentData) => ({
                url: '/register/parent',
                method: 'POST',
                body: parentData,
            }),
        }),
        userLogin: builder.mutation({
            query: (loginData) => ({
                url: '/login',
                method: 'POST',
                body: loginData

            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {

                try {
                    const result = await queryFulfilled
                    dispatch(userLoggedIn(result?.data.user))
                } catch (error) {
                    console.log(error)
                }

            }
        }),
        studentLogin: builder.mutation({
            query: (loginData) => ({
                url: '/student_login',
                method: 'POST',
                body: loginData

            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {

                try {
                    const result = await queryFulfilled
                    dispatch(userLoggedIn(result?.data?.student))
                } catch (error) {
                    console.log(error)
                }

            }
        }),
        loadUser: builder.query({
            query: () => ({
                url: '/load_user',
                method: 'GET'
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {

                try {
                    const result = await queryFulfilled
                    dispatch(userLoggedIn(result?.data?.user))
                } catch (error) {
                    console.log(error)
                }

            }
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'GET'
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {

                try {
                    const result = await queryFulfilled

                    dispatch(userLoggedOut())
                } catch (error) {
                    console.log(error)
                }

            }
        })
    }),
});

export const {
    useAdminRegistrationMutation,
    useParentRegistrationMutation,
    useStudentRegistrationMutation,
    useTeacherRegistrationMutation,
    useUserLoginMutation,
    useStudentLoginMutation,
   useLoadUserQuery,
   useLogoutMutation
} = authApi
