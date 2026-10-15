import { Clock, LayoutGrid, ShoppingCart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ACCESS } from '@/config/access';
import { useGetOrdersQuery } from '@/services/ordersApi';
import { useGetTablesQuery } from '@/services/operationsApi';
import DashboardShell, { TwoColumn } from '@/components/dashboard/DashboardShell';
import KpiGrid from '@/components/dashboard/KpiGrid';
import OrdersCard from '@/components/dashboard/OrdersCard';
import QuickActions from '@/components/dashboard/QuickActions';
import { TablesCard } from '@/components/dashboard/OperationsCards';
import { countBy, isActive, isToday } from '@/components/dashboard/helpers';

export default function WaiterDashboard() {
    const { user } = useAuth();
    const { data: tables = [] } = useGetTablesQuery();
    const { data: orders = [] } = useGetOrdersQuery();
    const mine = orders.filter((o) => o.createdBy === user!.fullName);

    return (
        <DashboardShell title="Waiter Dashboard" subtitle={`Welcome back, ${user!.fullName}`}>
            <KpiGrid items={[
                { label: 'My active orders', value: String(mine.filter(isActive).length), icon: ShoppingCart },
                { label: 'Orders today', value: String(mine.filter((o) => isToday(o.createdAt)).length), icon: Clock },
                { label: 'Free tables', value: String(countBy(tables, 'AVAILABLE')), hint: `${countBy(tables, 'CLEANING')} being cleaned`, icon: LayoutGrid },
            ]} />
            <TwoColumn>
                <TablesCard />
                <OrdersCard title="My orders" filter={(o) => o.createdBy === user!.fullName} />
            </TwoColumn>
            <QuickActions items={[
                { to: '/orders/new', label: 'Take new order', access: ACCESS.createOrder },
                { to: '/restaurant/tables', label: 'Tables', access: ACCESS.tables },
                { to: '/orders', label: 'All orders', access: ACCESS.orders },
            ]} />
        </DashboardShell>
    );
}