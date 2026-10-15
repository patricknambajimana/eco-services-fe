import { AlertTriangle, ClipboardList, Clock, Package } from 'lucide-react';
import { useAuth, useDepartmentScope } from '@/hooks/useAuth';
import { ACCESS } from '@/config/access';
import { useGetInventoryQuery } from '@/services/inventoryApi';
import DashboardShell, { TwoColumn } from '@/components/dashboard/DashboardShell';
import KpiGrid from '@/components/dashboard/KpiGrid';
import StockAlertsCard, { URGENT, useStockAlerts } from '@/components/dashboard/StockAlertsCard';
import RequisitionsCard, { usePendingRequisitions } from '@/components/dashboard/RequisitionsCard';
import QuickActions from '@/components/dashboard/QuickActions';
import { MovementsCard, SuppliersCard } from '@/components/dashboard/OperationsCards';
import { DEPT_THEME } from '@/components/dashboard/theme';

const DAY = 86_400_000;

export default function StockManagerDashboard() {
    const { user } = useAuth();
    const dept = useDepartmentScope()!;
    const { data: inventory = [] } = useGetInventoryQuery();
    const alerts = useStockAlerts(dept);
    const pending = usePendingRequisitions(dept);

    const items = inventory.filter((i) => i.department === dept);
    const expiringSoon = items.filter((i) => {
        if (!i.expiryDate) return false;
        const left = new Date(i.expiryDate).getTime() - Date.now();
        return left > 0 && left <= 7 * DAY;
    });

    return (
        <DashboardShell title={`${DEPT_THEME[dept].label} Stock Manager Dashboard`} subtitle={`Welcome back, ${user!.fullName}`}>
            <KpiGrid items={[
                { label: 'Items tracked', value: String(items.length), icon: Package },
                { label: 'Stock alerts', value: String(alerts.length), hint: `${alerts.filter((a) => URGENT.includes(a.status)).length} urgent`, icon: AlertTriangle },
                { label: 'Expiring in 7 days', value: String(expiringSoon.length), hint: expiringSoon.map((i) => i.name).slice(0, 2).join(', ') || 'None', icon: Clock },
                { label: 'Pending requisitions', value: String(pending.length), icon: ClipboardList },
            ]} />
            <TwoColumn><StockAlertsCard department={dept} /><RequisitionsCard department={dept} /></TwoColumn>
            <TwoColumn><MovementsCard department={dept} /><SuppliersCard /></TwoColumn>
            <QuickActions items={[
                { to: '/inventory', label: 'Inventory', access: ACCESS.inventory },
                { to: '/inventory/movements', label: 'Record movement', access: ACCESS.movements },
                { to: '/inventory/requisitions', label: 'Requisitions', access: ACCESS.requisitions },
                { to: '/inventory/suppliers', label: 'Suppliers', access: ACCESS.suppliers },
            ]} />
        </DashboardShell>
    );
}