import { AlertTriangle, ChefHat, Clock, UtensilsCrossed, Wheat } from 'lucide-react';
import { useAuth, useDepartmentScope } from '@/hooks/useAuth';
import { ACCESS } from '@/config/access';
import { useGetBatchesQuery, useGetKitchenQuery } from '@/services/operationsApi';
import DashboardShell, { TwoColumn } from '@/components/dashboard/DashboardShell';
import KpiGrid from '@/components/dashboard/KpiGrid';
import type { Kpi } from '@/components/dashboard/KpiGrid';
import StockAlertsCard, { useStockAlerts } from '@/components/dashboard/StockAlertsCard';
import QuickActions from '@/components/dashboard/QuickActions';
import { BatchesCard, KitchenQueueCard } from '@/components/dashboard/OperationsCards';
import { countBy } from '@/components/dashboard/helpers';
import { DEPT_THEME } from '@/components/dashboard/theme';

export default function ChefDashboard() {
    const { user } = useAuth();
    const dept = useDepartmentScope()!;
    const restaurant = dept === 'RESTAURANT';
    const { data: tickets = [] } = useGetKitchenQuery();
    const { data: batches = [] } = useGetBatchesQuery();
    const alerts = useStockAlerts(dept);

    const kpis: Kpi[] = restaurant
        ? [
            { label: 'To start', value: String(countBy(tickets, 'NEW')), icon: ChefHat },
            { label: 'Preparing', value: String(countBy(tickets, 'PREPARING')), icon: Clock },
            { label: 'Ready', value: String(countBy(tickets, 'READY')), icon: UtensilsCrossed },
            { label: 'Ingredient alerts', value: String(alerts.length), icon: AlertTriangle },
        ]
        : [
            { label: 'To bake', value: String(countBy(batches, 'PLANNED')), icon: Clock },
            { label: 'In progress', value: String(countBy(batches, 'IN_PROGRESS')), icon: Wheat },
            { label: 'Completed', value: String(countBy(batches, 'COMPLETED')), icon: ChefHat },
            { label: 'Ingredient alerts', value: String(alerts.length), icon: AlertTriangle },
        ];

    return (
        <DashboardShell title={`${DEPT_THEME[dept].label} Chef Dashboard`} subtitle={`Your tasks today, ${user!.fullName}`}>
            <KpiGrid items={kpis} />
            <TwoColumn>
                {restaurant ? <KitchenQueueCard /> : <BatchesCard />}
                <StockAlertsCard department={dept} limit={5} />
            </TwoColumn>
            <QuickActions items={[
                { to: '/restaurant/kitchen', label: 'Kitchen display', access: ACCESS.kitchen },
                { to: '/bakery/batches', label: 'Production batches', access: ACCESS.batches },
                { to: '/inventory', label: 'Station inventory', access: ACCESS.inventory },
            ]} />
        </DashboardShell>
    );
}