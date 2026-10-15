import { AlertTriangle, Gift, Store } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ACCESS } from '@/config/access';
import { useGetInventoryQuery } from '@/services/inventoryApi';
import { useGetGiftsQuery } from '@/services/operationsApi';
import DashboardShell, { TwoColumn } from '@/components/dashboard/DashboardShell';
import KpiGrid from '@/components/dashboard/KpiGrid';
import StockAlertsCard, { useStockAlerts } from '@/components/dashboard/StockAlertsCard';
import QuickActions from '@/components/dashboard/QuickActions';
import { GiftsCard, ShowroomCard } from '@/components/dashboard/OperationsCards';
import { countBy } from '@/components/dashboard/helpers';

export default function DecorationStaffDashboard() {
    const { user } = useAuth();
    const { data: inventory = [] } = useGetInventoryQuery();
    const { data: gifts = [] } = useGetGiftsQuery();
    const alerts = useStockAlerts('DECORATION');
    const showroom = inventory.filter((i) => i.department === 'DECORATION');

    return (
        <DashboardShell title="Decoration Staff Dashboard" subtitle={`Showroom floor · ${user!.fullName}`}>
            <KpiGrid items={[
                { label: 'Showroom items', value: String(showroom.reduce((s, i) => s + i.quantity, 0)), hint: `${showroom.length} products`, icon: Store },
                { label: 'Pending gift requests', value: String(countBy(gifts, 'PENDING')), hint: `${countBy(gifts, 'IN_PROGRESS')} in progress`, icon: Gift },
                { label: 'Restock needed', value: String(alerts.length), icon: AlertTriangle },
            ]} />
            <TwoColumn><GiftsCard /><ShowroomCard /></TwoColumn>
            <TwoColumn><StockAlertsCard department="DECORATION" /><div /></TwoColumn>
            <QuickActions items={[
                { to: '/decoration/showroom', label: 'Showroom', access: ACCESS.showroom },
                { to: '/decoration/gifts', label: 'Gift services', access: ACCESS.gifts },
                { to: '/inventory', label: 'Inventory', access: ACCESS.inventory },
            ]} />
        </DashboardShell>
    );
}