import { apiSlice } from './apiSlice';

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        createOrder: builder.mutation ({
            query: (order) => ({
                url: '/api/orders',
                method: 'POST',
                body: {...order}
            })
        }),

        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `/api/orders/${orderId}`,
                method: 'GET'
            }),
            keepUnusedDataFor: 5
        })
    })
})

export const { useCreateOrderMutation, useGetOrderDetailsQuery } = ordersApiSlice