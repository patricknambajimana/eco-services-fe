import { baseApi } from './baseApi';
import type { CatalogProduct, CreateOrderPayload, Customer, Order, OrderStatus } from '@/types';

export const ordersApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getOrders: build.query<Order[], void>({ query: () => ({ url: '/orders' }), providesTags: ['Orders'] }),
        getOrder: build.query<Order, string>({
            query: (id) => ({ url: `/orders/${id}` }),
            providesTags: ['Orders'],
        }),
        createOrder: build.mutation<Order, CreateOrderPayload>({
            query: (data) => ({ url: '/orders', method: 'POST', data }),
            invalidatesTags: ['Orders'],
        }),
        updateOrderStatus: build.mutation<Order, { id: string; status: OrderStatus; by: string }>({
            query: ({ id, ...data }) => ({ url: `/orders/${id}/status`, method: 'PATCH', data }),
            invalidatesTags: ['Orders'],
        }),
        getCatalog: build.query<CatalogProduct[], void>({
            query: () => ({ url: '/products', headers: { 'Cache-Control': 'no-cache, no-store' } }),
        }),
        getCustomers: build.query<Customer[], void>({ query: () => ({ url: '/customers' }) }),
    }),
});

export const {
    useGetOrdersQuery, useGetOrderQuery, useCreateOrderMutation,
    useUpdateOrderStatusMutation, useGetCatalogQuery, useGetCustomersQuery,
} = ordersApi;