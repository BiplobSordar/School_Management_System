import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3421/api/v1/admin',
        credentials: 'include',
    }),

    endpoints: (builder) => ({
        getUserListsByRole: builder.mutation({
            query: (filtersData) => ({
                url: `/user_lists?role=${filtersData.role}`,
                method: 'POST',
                body: filtersData,

            }),
        }),
        getSingleUserProfile: builder.query({
            query: (userId) => ({
                url: `/profile/${userId}`, // Make userId dynamic
                method: 'GET',

            }),
        }),


        updateProfileDetailsByAdmin: builder.mutation({
            query: ({ formData, user_id }) => ({
                url: `/update_profile/${user_id}`,
                method: 'PUT',
                body: formData,
            }),
            async onQueryStarted({ user_id }, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled
                    dispatch(adminApi.endpoints.getSingleUserProfile.initiate(user_id, { forceRefetch: true }));
                    // setTimeout(() => {
                    //     dispatch(adminApi.endpoints.getSingleUserProfile.initiate(user_id, { forceRefetch: true }));
                    // }, 1500);

                } catch (error) {
                    console.error("Error triggering another query:", error);
                }
            }


        }),
        deleteUserByAdmin: builder.mutation({
            query: (userId) => ({
                url: `/delete_user/${userId}`,
                method: "DELETE",
            }),





        }),
        uploadProfileImageByAdmin: builder.mutation({
            query: ({ file, user_id }) => {
                const formData = new FormData();
                formData.append("image", file);
                return {
                    url: `/upload_profile_image/${user_id}`,
                    method: "POST",
                    body: formData
                }

            },
            async onQueryStarted({ user_id }, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled
                    dispatch(adminApi.endpoints.getSingleUserProfile.initiate(user_id, { forceRefetch: true }));
                    

                } catch (error) {
                    console.error("Error triggering another query:", error);
                }
            }






        }),






    }),
});

export const {
    useGetUserListsByRoleMutation, useGetSingleUserProfileQuery, useUpdateProfileDetailsByAdminMutation, useDeleteUserByAdminMutation, useUploadProfileImageByAdminMutation
} = adminApi