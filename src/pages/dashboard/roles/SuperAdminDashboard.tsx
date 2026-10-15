import { useAuth } from '@/hooks/useAuth';
import { ACCESS } from '@/config/access';
import DashboardShell, { Block, TwoColumn } from '@/components/dashboard/DashboardShell';
import WithDashboardData from '@/components/dashboard/WithDashboardData';
import DepartmentStatements from '@/components/dashboard/DepartmentStatements';
import KpiGrid, { apiKpis } from '@/components/dashboard/KpiGrid';
import TrendCharts from '@/components/dashboard/TrendCharts';
import AnalysisCards from '@/components/dashboard/AnalysisCards';
import AlertsCard from '@/components/dashboard/AlertsCard';
import RequisitionsCard from '@/components/dashboard/RequisitionsCard';
import StockAlertsCard from '@/components/dashboard/StockAlertsCard';
import StaffCard from '@/components/dashboard/StaffCard';
import OrdersCard from '@/components/dashboard/OrdersCard';
import QuickActions from '@/components/dashboard/QuickActions';
import { DEPT_THEME } from '@/components/dashboard/theme';

export default function SuperAdminDashboard() {
    const { user } = useAuth();
    return (
        <DashboardShell title="Super Admin Dashboard" subtitle={`Welcome back, ${user!.fullName} · full system control`}>
            <WithDashboardData department="MANAGEMENT">
                {(data) => (
                    <>
                        <DepartmentStatements statements={data.departmentPerformance} intro />
                        <KpiGrid items={apiKpis(data.stats)} />
                        <TrendCharts data={data} color={DEPT_THEME.MANAGEMENT.chart} />
                        <AnalysisCards items={data.analysis} />
                        <TwoColumn><RequisitionsCard /><StockAlertsCard /></TwoColumn>
                        <TwoColumn><StaffCard includeManagement /><AlertsCard alerts={data.alerts} /></TwoColumn>
                        <Block><OrdersCard title="Recent orders · all departments" /></Block>
                        <QuickActions items={[
                            { to: '/staff', label: 'Create user account', access: ACCESS.staff },
                            { to: '/staff/credentials', label: 'Manage credentials', access: ACCESS.credentials },
                            { to: '/reports', label: 'View reports', access: ACCESS.reports },
                            { to: '/settings', label: 'System settings' },
                        ]} />
                    </>
                )}
            </WithDashboardData>
        </DashboardShell>
    );
}