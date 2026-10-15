import { baseApi } from './baseApi';
import type {
    BatchStatus, GiftRequest, KitchenStatus, KitchenTicket, MenuItem, ProductionBatch,
    TableItem, TableStatus,
} from '@/types';

interface BackendTable {
    id?: string | number;
    tableId?: string | number;
    number?: string | number;
    tableNumber?: string | number;
    seats?: number;
    capacity?: number;
    status?: string;
}

const normalizeTable = (table: BackendTable): TableItem => ({
    id: String(table.id ?? table.tableId ?? table.number ?? table.tableNumber),
    number: String(table.number ?? table.tableNumber ?? table.id ?? table.tableId),
    seats: table.seats ?? table.capacity ?? 0,
    status: (table.status ?? 'AVAILABLE').toUpperCase() as TableStatus,
});

export const operationsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getBatches: build.query<ProductionBatch[], void>({ query: () => ({ url: '/production/batches' }), providesTags: ['Batches'] }),
        updateBatch: build.mutation<ProductionBatch, { id: string; status: BatchStatus }>({
            query: ({ id, status }) => ({ url: `/production/batches/${id}/status`, method: 'PATCH', data: { status } }), invalidatesTags: ['Batches'],
        }),
        getTables: build.query<TableItem[], void>({
            query: () => ({ url: '/tables', headers: { 'Cache-Control': 'no-cache' } }),
            transformResponse: (tables: BackendTable[]) => tables.map(normalizeTable),
            providesTags: ['Tables'],
        }),
        updateTable: build.mutation<TableItem, { id: string; status: TableStatus }>({
            query: ({ id, ...data }) => ({ url: `/tables/${id}`, method: 'PUT', data }), invalidatesTags: ['Tables'],
        }),
        getKitchen: build.query<KitchenTicket[], void>({
            queryFn: async () => ({ data: [] }),
            providesTags: ['Kitchen'],
        }),
        updateKitchen: build.mutation<KitchenTicket, { id: string; status: KitchenStatus }>({
            queryFn: async () => ({ error: { status: 501, message: 'Kitchen endpoints are not available in the current backend.' } }),
            invalidatesTags: ['Kitchen'],
        }),
        getMenu: build.query<MenuItem[], void>({
            query: () => ({ url: '/products', headers: { 'Cache-Control': 'no-cache, no-store' } }),
            providesTags: ['Menu'],
        }),
        updateMenuItem: build.mutation<MenuItem, { id: string; price?: number; available?: boolean }>({
            query: ({ id, ...data }) => ({ url: `/products/${id}`, method: 'PUT', data }), invalidatesTags: ['Menu'],
        }),
        getGifts: build.query<GiftRequest[], void>({
            queryFn: async () => ({ data: [] }),
            providesTags: ['Gifts'],
        }),
        updateGift: build.mutation<GiftRequest, { id: string; status: GiftRequest['status'] }>({
            queryFn: async () => ({ error: { status: 501, message: 'Gift service endpoints are not available in the current backend.' } }),
            invalidatesTags: ['Gifts'],
        }),
    }),
});

export const {
    useGetBatchesQuery, useUpdateBatchMutation, useGetTablesQuery, useUpdateTableMutation,
    useGetKitchenQuery, useUpdateKitchenMutation, useGetMenuQuery, useUpdateMenuItemMutation,
    useGetGiftsQuery, useUpdateGiftMutation,
} = operationsApi;