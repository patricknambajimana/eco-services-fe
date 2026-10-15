import { createApi } from '@reduxjs/toolkit/query/react';
import { API_URL, USE_MOCK } from '@/config/env';
import { axiosBaseQuery } from './axiosBaseQuery';
import { mockBaseQuery } from './mock/mockBaseQuery';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: USE_MOCK ? mockBaseQuery : axiosBaseQuery(API_URL),
    tagTypes: [
        'Orders', 'Inventory', 'Movements', 'Requisitions', 'Staff', 'Schedule',
        'Batches', 'Tables', 'Kitchen', 'Menu', 'Gifts',
        'Communications',
    ],
    endpoints: () => ({}),
});