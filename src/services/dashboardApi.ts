import { baseApi } from './baseApi';
import { USE_MOCK } from '@/config/env';
import type { DashboardData, Department } from '@/types';

interface BackendDashboard {
    totalRevenue?: number;
    activeOrders?: number;
    ordersByStatus?: Array<{ status?: string; count?: number }>;
    inventoryAlerts?: number;
    staffOnShiftToday?: number;
    tableOccupancy?: Array<{ status?: string; count?: number }>;
}

const asNumber = (value: unknown): number =>
    typeof value === 'number' && Number.isFinite(value) ? value : 0;

const formatCurrency = (value: number): string =>
    new Intl.NumberFormat(undefined, { style: 'currency', currency: 'RWF', maximumFractionDigits: 0 }).format(value);

const normalizeDashboard = (response: BackendDashboard | { data?: BackendDashboard }): DashboardData => {
    const payload: BackendDashboard =
        'data' in response && response.data !== undefined
            ? response.data
            : response as BackendDashboard;
    const ordersByStatus = payload.ordersByStatus ?? [];
    const tableOccupancy = payload.tableOccupancy ?? [];

    return {
        title: 'Business overview',
        stats: [
            { label: 'Total revenue', value: formatCurrency(asNumber(payload.totalRevenue)), hint: 'All recorded sales' },
            { label: 'Active orders', value: String(asNumber(payload.activeOrders)), hint: 'Orders still in progress' },
            { label: 'Inventory alerts', value: String(asNumber(payload.inventoryAlerts)), hint: 'Items requiring attention' },
            { label: 'Staff on shift', value: String(asNumber(payload.staffOnShiftToday)), hint: 'Scheduled for today' },
        ],
        trend: {
            title: 'Orders by status',
            data: ordersByStatus.map((item) => ({
                name: item.status ?? 'Unknown',
                value: asNumber(item.count),
            })),
        },
        breakdown: {
            title: 'Table occupancy',
            data: tableOccupancy.map((item) => ({
                name: item.status ?? 'Unknown',
                value: asNumber(item.count),
            })),
        },
        alerts: asNumber(payload.inventoryAlerts) > 0
            ? [`${payload.inventoryAlerts} inventory item${payload.inventoryAlerts === 1 ? '' : 's'} need attention.`]
            : ['No inventory alerts.'],
    };
};

export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getDashboard: build.query<DashboardData, Department>({
            query: (department) => ({
                // The mock server exposes department-scoped dashboards; the backend
                // aggregates the authenticated user's department at this endpoint.
                url: USE_MOCK ? `/dashboard/${department}` : '/reports/dashboard',
                headers: { 'Cache-Control': 'no-cache' },
            }),
            transformResponse: normalizeDashboard,
        }),
    }),
});

export const { useGetDashboardQuery } = dashboardApi;
