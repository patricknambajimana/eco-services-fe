import { useAuth } from '@/hooks/useAuth';
import DashboardShell, { TwoColumn } from '@/components/dashboard/DashboardShell';
import OrdersCard from '@/components/dashboard/OrdersCard';
import StockAlertsCard from '@/components/dashboard/StockAlertsCard';
import { ROLE_DASHBOARDS } from './roleDashboards';

/** Shown only if a role has no dashboard registered yet. */
function FallbackDashboard() {
    const { user } = useAuth();
    return (
        <DashboardShell title="Dashboard" subtitle={`Welcome back, ${user!.fullName}`}>
            <TwoColumn><OrdersCard /><StockAlertsCard /></TwoColumn>
        </DashboardShell>
    );
}

export default function DashboardPage() {
    const { user } = useAuth();
    const RoleDashboard = ROLE_DASHBOARDS[user!.role] ?? FallbackDashboard;
    return <RoleDashboard />;
}