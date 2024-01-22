import {
    apiSlice
} from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/api/users/login',
                method: 'POST',
                body: data

            }),
        }),

        register: builder.mutation({
            query: (data) => ({
                url: '/api/users/register',
                method: 'POST',
                body: data
            })
        }),

        logout: builder.mutation({
            query: () => ({
                url: '/api/users/logout',
                method: 'POST'
            })
        }),

        profile: builder.mutation({
            query: (data) => ({
                url: '/api/users/profile',
                method: 'PUT',
                body: data
            })
        }),

        getUsers: builder.query({
            query: () => ({
                url: '/api/users'
            }),
            providesTags: ['Users'],
            keepUnusedDataFor: 5
        }),

        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/api/users/${userId}`,
                method: 'DELETE'
            })
        }),

        getUserDetails: builder.query({
            query: (userId) => ({
                url: `/api/users/${userId}`
            }),
            keepUnusedDataFor: 5,
        }),

        updateUser: builder.mutation({
            query: (data) => ({
                url: `/api/users/${data.userId}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Users']
        })
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
    useGetUserDetailsQuery,
    useUpdateUserMutation
} = usersApiSlice;