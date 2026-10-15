import { baseApi } from './baseApi';
import type { InventoryItem, MovementType, Requisition, StockMovement, Supplier } from '@/types';

export const inventoryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getInventory: build.query<InventoryItem[], void>({
            query: () => ({ url: '/inventory/items' }), providesTags: ['Inventory'],
        }),
        updateInventory: build.mutation<InventoryItem, { id: string; quantity: number }>({
            query: ({ id, ...data }) => ({ url: `/inventory/items/${id}`, method: 'PUT', data }),
            invalidatesTags: ['Inventory'],
        }),
        getMovements: build.query<StockMovement[], void>({
            query: () => ({ url: '/inventory/movements' }), providesTags: ['Movements'],
        }),
        createMovement: build.mutation<StockMovement,
            { productId: string; type: MovementType; quantity: number; user: string }>({
                query: (data) => ({ url: '/inventory/movements', method: 'POST', data }),
                invalidatesTags: ['Movements', 'Inventory'],
            }),
        getRequisitions: build.query<Requisition[], void>({
            query: () => ({ url: '/inventory/requisitions' }), providesTags: ['Requisitions'],
        }),
        createRequisition: build.mutation<Requisition, Omit<Requisition, 'id' | 'status'>>({
            query: (data) => ({ url: '/inventory/requisitions', method: 'POST', data }),
            invalidatesTags: ['Requisitions'],
        }),
        reviewRequisition: build.mutation<Requisition,
            { id: string; status: 'APPROVED' | 'REJECTED'; by: string }>({
                query: ({ id, status }) => ({ url: `/inventory/requisitions/${id}/decision`, method: 'PATCH', data: { decision: status } }),
                invalidatesTags: ['Requisitions', 'Movements', 'Inventory'],
            }),
        getSuppliers: build.query<Supplier[], void>({ query: () => ({ url: '/inventory/suppliers' }) }),
    }),
});

export const {
    useGetInventoryQuery, useUpdateInventoryMutation, useGetMovementsQuery, useCreateMovementMutation,
    useGetRequisitionsQuery, useCreateRequisitionMutation, useReviewRequisitionMutation, useGetSuppliersQuery,
} = inventoryApi;