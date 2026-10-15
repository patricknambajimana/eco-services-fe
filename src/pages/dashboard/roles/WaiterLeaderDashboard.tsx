import { Clock, LayoutGrid, ShoppingCart, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ACCESS } from '@/config/access';
import { useGetOrdersQuery } from '@/services/ordersApi';
import { useGetTablesQuery } from '@/services/operationsApi';
import DashboardShell, { TwoColumn } from '@/components/dashboard/DashboardShell';
import KpiGrid from '@/components/dashboard/KpiGrid';
import OrdersCard from '@/components/dashboard/OrdersCard';
import StaffCard from '@/components/dashboard/StaffCard';
import QuickActions from '@/components/dashboard/QuickActions';
import { TablesCard } from '@/components/dashboard/OperationsCards';
import { countBy, isActive, orderInDept } from '@/components/dashboard/helpers';

export default function WaiterLeaderDashboard() {
    const { user } = useAuth();
    const { data: tables = [] } = useGetTablesQuery();
    const { data: orders = [] } = useGetOrdersQuery();
    const active = orders.filter((o) => orderInDept(o, 'RESTAURANT') && isActive(o));

    return (
        <DashboardShell title="Waiter Leader Dashboard" subtitle={`Floor overview · ${user!.fullName}`}>
            <KpiGrid items={[
                { label: 'Available tables', value: String(countBy(tables, 'AVAILABLE')), icon: LayoutGrid },
                { label: 'Occupied', value: String(countBy(tables, 'OCCUPIED')), hint: `${countBy(tables, 'RESERVED')} reserved`, icon: Users },
                { label: 'Active orders', value: String(active.length), icon: ShoppingCart },
                { label: 'Awaiting payment', value: String(active.filter((o) => o.paymentStatus === 'UNPAID').length), icon: Clock },
            ]} />
            <TwoColumn>
                <TablesCard />
                <OrdersCard title="Active orders" department="RESTAURANT" filter={isActive} />
            </TwoColumn>
            <TwoColumn><StaffCard department="RESTAURANT" /><div /></TwoColumn>
            <QuickActions items={[
                { to: '/restaurant/tables', label: 'Manage tables', access: ACCESS.tables },
                { to: '/orders', label: 'Orders', access: ACCESS.orders },
                { to: '/staff', label: 'Team', access: ACCESS.staff },
            ]} />
        </DashboardShell>
    );
}