import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn, userLoggedOut } from '../features/auth/authSlice';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3421/api/v1/auth',
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
        getProfile: builder.query({
            query: () => ({
                url: '/profile',
                method: 'GET'
            }),


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
                    dispatch(authApi.util.resetApiState())
                } catch (error) {
                    console.log(error)
                }

            }
        }),
        uploadProfileImage: builder.mutation({
            query: (file) => {
                const formData = new FormData();
                formData.append("image", file); // Append the file to FormData

                return {
                    url: '/profile/upload_profile_image',
                    method: 'POST',
                    body: formData,
                }

            },
            async onQueryStarted(_, { queryFulfilled, dispatch }) {

                try {
                    const result = await queryFulfilled

                    dispatch(userLoggedIn(result?.data?.user))

                } catch (error) {
                    console.log(error)
                }

            }
        }),
        updateProfileDetails: builder.mutation({
            query: (formData) => ({
                url: '/update_profile',
                method: 'PUT',
                body: formData,
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled
                    // dispatch(authApi.endpoints.loadUser.initiate()).unwrap()
                    setTimeout(() => {
                        dispatch(authApi.endpoints.loadUser.initiate(null, { forceRefetch: true }));
                    }, 1500);
                   
                } catch (error) {
                    console.error("Error triggering another query:", error);
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
    useLogoutMutation,
    useGetProfileQuery,
    useUploadProfileImageMutation,
    useUpdateProfileDetailsMutation
} = authApi
