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

export default function GeneralManagerDashboard() {
    const { user } = useAuth();
    return (
        <DashboardShell title="General Manager Dashboard"
            subtitle={`${user!.fullName} · Restaurant, Bakery and Decoration`}>
            <WithDashboardData department="MANAGEMENT">
                {(data) => (
                    <>
                        <DepartmentStatements statements={data.departmentPerformance} intro />
                        <KpiGrid items={apiKpis(data.stats)} />
                        <TrendCharts data={data} color={DEPT_THEME.MANAGEMENT.chart} />
                        <AnalysisCards items={data.analysis} />
                        <TwoColumn><RequisitionsCard /><StockAlertsCard /></TwoColumn>
                        <TwoColumn><StaffCard /><AlertsCard alerts={data.alerts} /></TwoColumn>
                        <Block><OrdersCard title="Recent orders · all departments" /></Block>
                        <QuickActions items={[
                            { to: '/staff', label: 'Create staff account', access: ACCESS.staff },
                            { to: '/staff/credentials', label: 'Credentials', access: ACCESS.credentials },
                            { to: '/staff/schedule', label: 'Staff schedule', access: ACCESS.schedule },
                            { to: '/menus', label: 'Menus & QR codes', access: ACCESS.menu },
                            { to: '/reports', label: 'Reports', access: ACCESS.reports },
                            { to: '/inventory/requisitions', label: 'Requisitions', access: ACCESS.requisitions },
                        ]} />
                    </>
                )}
            </WithDashboardData>
        </DashboardShell>
    );
}