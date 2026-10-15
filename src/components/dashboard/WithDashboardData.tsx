import type { ReactNode } from 'react';
import { useGetDashboardQuery } from '@/services/dashboardApi';
import type { DashboardData, Department } from '@/types';

interface Props { department: Department; children: (data: DashboardData) => ReactNode }

/** Loads the dashboard payload and handles the loading and error states once. */
export default function WithDashboardData({ department, children }: Props) {
    const { data, isLoading, isError, error } = useGetDashboardQuery(department);
    if (isLoading) return <p className="text-slate-400">Loading dashboard…</p>;
    if (isError || !data) {
        const message = error && 'message' in error ? String(error.message) : 'The dashboard could not be loaded.';
        return <p className="text-red-600">{message}</p>;
    }
    return <>{children(data)}</>;
}