import { Clock, CreditCard, DollarSign, ShoppingCart } from 'lucide-react';
import { useAuth, useDepartmentScope } from '@/hooks/useAuth';
import { ACCESS } from '@/config/access';
import { useGetOrdersQuery } from '@/services/ordersApi';
import { formatCurrency } from '@/utils/format';
import DashboardShell, { Block, TwoColumn } from '@/components/dashboard/DashboardShell';
import KpiGrid from '@/components/dashboard/KpiGrid';
import OrdersCard from '@/components/dashboard/OrdersCard';
import QuickActions from '@/components/dashboard/QuickActions';
import { GiftsCard } from '@/components/dashboard/OperationsCards';
import { deptTotal, isToday, orderInDept } from '@/components/dashboard/helpers';
import { DEPT_THEME } from '@/components/dashboard/theme';

export default function CashierDashboard() {
    const { user } = useAuth();
    const dept = useDepartmentScope()!;
    const { data: orders = [] } = useGetOrdersQuery();

    const mine = orders.filter((o) => orderInDept(o, dept));
    const unpaid = mine.filter((o) => o.paymentStatus === 'UNPAID');
    const paidToday = mine.filter((o) => o.paymentStatus === 'PAID' && isToday(o.createdAt));
    const sum = (list: typeof mine) => list.reduce((s, o) => s + deptTotal(o, dept), 0);

    return (
        <DashboardShell title={`${DEPT_THEME[dept].label} Cashier Dashboard`} subtitle={`Welcome back, ${user!.fullName}`}>
            <KpiGrid items={[
                { label: "Today's sales", value: formatCurrency(sum(paidToday)), hint: `${paidToday.length} paid orders`, icon: DollarSign },
                { label: 'To collect', value: formatCurrency(sum(unpaid)), icon: CreditCard },
                { label: 'Unpaid orders', value: String(unpaid.length), icon: Clock },
                { label: 'Orders today', value: String(mine.filter((o) => isToday(o.createdAt)).length), icon: ShoppingCart },
            ]} />
            <TwoColumn>
                <OrdersCard title="Awaiting payment" department={dept} filter={(o) => o.paymentStatus === 'UNPAID'} />
                <OrdersCard title={dept === 'BAKERY' ? 'Ready for pickup' : 'Ready to serve'} department={dept} filter={(o) => o.status === 'READY'} />
            </TwoColumn>
            {dept === 'DECORATION' && <Block><GiftsCard /></Block>}
            <QuickActions items={[
                { to: '/orders/new', label: 'New order', access: ACCESS.createOrder },
                { to: '/orders', label: 'All orders', access: ACCESS.orders },
            ]} />
        </DashboardShell>
    );
}