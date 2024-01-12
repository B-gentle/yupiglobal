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
        }), 

        payOrder: builder.mutation({
            query: ({orderId, details}) => ({
                url: `/api/orders/${orderId}/pay`,
                method: 'PUT',
                body: {...details}
            })
        }),

        getMyOrdes: builder.query({
            query: () => ({
                url: '/api/orders/myorders',
                method: 'GET'
            }),
            keepUnusedDataFor: 5
        }),

        getOrders: builder.query({
            query: () => ({
                url: '/api/orders/'
            }),
            keepUnusedDataFor: 5
        }),

        updateDeliverOrder: builder.mutation({
            query: (orderId) => ({
                url: `/api/orders/${orderId}/deliver`,
                method: 'PUT'
            })
        })
    })
})

export const { useCreateOrderMutation, useGetOrderDetailsQuery, usePayOrderMutation, useGetMyOrdesQuery, useGetOrdersQuery, useUpdateDeliverOrderMutation } = ordersApiSlice