import {
    apiSlice
} from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getCategories: builder.query({
            query: () => ({
                url: '/api/products/categories'
            }),
            keepUnusedDataFor: 5
        }),

        addCategory: builder.mutation({
            query: (data) => ({
                url: '/api/products/addcategory',
                method: 'POST',
                body: data
            })
        }),

        getProducts: builder.query({
            query: () => ({
                url: '/api/products',
            }),
            providesTags: ['Product'],
            keepUnusedDataFor: 59
        }),

        getProductDetails: builder.query({
            query: (id) => ({
                url: `/api/products/${id}`
            }),
            keepUnusedDataFor: 5
        }),

        createProduct: builder.mutation({
            query: (newProduct) => ({
                url: '/api/products',
                method: 'POST',
                body: {
                    ...newProduct
                }
            }),
            invalidatesTags: ['Product']
        }),

        updateProduct: builder.mutation({
            query: ({data, productId}) => ({
                url: `/api/products/${productId}`,
                method: 'PUT',
                body: {...data}
            }),
            invalidatesTags: ['Product']
        }),

        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: '/api/upload',
                method: 'POST',
                body: data
            })
        }),

        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `/api/products/${productId}`,
                method: 'DELETE'
            })
        }),

        createReview: builder.mutation({
            query: (data) => ({
                url: `/api/products/${data.productId}/reviews`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["Product"]
        })
    })
});

export const {
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useAddCategoryMutation,
    useGetCategoriesQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation,
    useCreateReviewMutation
} = productsApiSlice