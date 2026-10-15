import { baseApi } from './baseApi';
import type { AppNotification, RevenueRow } from '@/types';

export const reportsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getRevenueReport: build.query<RevenueRow[], void>({ query: () => ({ url: '/reports/sales' }) }),
        getNotifications: build.query<AppNotification[], void>({
            queryFn: async () => ({ data: [] }),
        }),
    }),
});

export const { useGetRevenueReportQuery, useGetNotificationsQuery } = reportsApi;
