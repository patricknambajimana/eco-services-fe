import type { ReactNode } from 'react';
import { useAuth, useDepartmentScope } from '@/hooks/useAuth';
import { ACCESS } from '@/config/access';
import DashboardShell, { TwoColumn } from '@/components/dashboard/DashboardShell';
import WithDashboardData from '@/components/dashboard/WithDashboardData';
import DepartmentStatements from '@/components/dashboard/DepartmentStatements';
import KpiGrid, { apiKpis } from '@/components/dashboard/KpiGrid';
import TrendCharts from '@/components/dashboard/TrendCharts';
import AnalysisCards from '@/components/dashboard/AnalysisCards';
import RequisitionsCard from '@/components/dashboard/RequisitionsCard';
import StockAlertsCard from '@/components/dashboard/StockAlertsCard';
import StaffCard from '@/components/dashboard/StaffCard';
import OrdersCard from '@/components/dashboard/OrdersCard';
import QuickActions from '@/components/dashboard/QuickActions';
import {
    BatchesCard, GiftsCard, KitchenQueueCard, ShowroomCard, SuppliersCard, TablesCard,
} from '@/components/dashboard/OperationsCards';
import { DEPT_THEME } from '@/components/dashboard/theme';
import type { OperatingDepartment } from '@/types';

/** The two cards that matter most to each department's operations. */
const PANELS: Record<OperatingDepartment, ReactNode> = {
    RESTAURANT: <><TablesCard /><KitchenQueueCard /></>,
    BAKERY: <><BatchesCard /><SuppliersCard /></>,
    DECORATION: <><GiftsCard /><ShowroomCard /></>,
};

const OPERATION_LINK: Record<OperatingDepartment, { to: string; label: string }> = {
    RESTAURANT: { to: '/restaurant/kitchen', label: 'Kitchen display' },
    BAKERY: { to: '/bakery/batches', label: 'Production batches' },
    DECORATION: { to: '/decoration/showroom', label: 'Showroom' },
};

export default function DepartmentManagerDashboard() {
    const { user } = useAuth();
    const dept = useDepartmentScope()!;
    const theme = DEPT_THEME[dept];

    return (
        <DashboardShell title={`${theme.label} Manager Dashboard`} subtitle={`Welcome back, ${user!.fullName}`}>
            <WithDashboardData department={dept}>
                {(data) => (
                    <>
                        <DepartmentStatements statements={data.departmentPerformance?.filter((s) => s.department === dept)} />
                        <KpiGrid items={apiKpis(data.stats)} />
                        <TrendCharts data={data} color={theme.chart} />
                        <AnalysisCards items={data.analysis} />
                        <TwoColumn>{PANELS[dept]}</TwoColumn>
                        <TwoColumn><RequisitionsCard department={dept} /><StockAlertsCard department={dept} /></TwoColumn>
                        <TwoColumn><StaffCard department={dept} /><OrdersCard department={dept} /></TwoColumn>
                        <QuickActions items={[
                            { ...OPERATION_LINK[dept] },
                            { to: '/menus', label: 'Menu & QR code', access: ACCESS.menu },
                            { to: '/inventory', label: 'Inventory', access: ACCESS.inventory },
                            { to: '/staff/schedule', label: 'Staff schedule', access: ACCESS.schedule },
                            { to: '/reports', label: 'Reports', access: ACCESS.reports },
                        ]} />
                    </>
                )}
            </WithDashboardData>
        </DashboardShell>
    );
}