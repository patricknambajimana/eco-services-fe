import { Coffee, Package, ShoppingCart, UtensilsCrossed } from 'lucide-react';
import { useAuth, useDepartmentScope } from '@/hooks/useAuth';
import { ACCESS } from '@/config/access';
import { useGetCatalogQuery, useGetOrdersQuery } from '@/services/ordersApi';
import { useGetInventoryQuery } from '@/services/inventoryApi';
import { getInventoryStatus } from '@/utils/inventory';
import Card from '@/components/ui/LegacyCard';
import StatusBadge from '@/components/ui/StatusBadge';
import DashboardShell, { TwoColumn } from '@/components/dashboard/DashboardShell';
import KpiGrid from '@/components/dashboard/KpiGrid';
import OrdersCard from '@/components/dashboard/OrdersCard';
import QuickActions from '@/components/dashboard/QuickActions';
import { isActive, orderInDept } from '@/components/dashboard/helpers';
import { DEPT_THEME } from '@/components/dashboard/theme';
import type { Order } from '@/types';

const BEVERAGE_CATEGORIES = ['Coffee', 'Drinks'];

export default function BaristaDashboard() {
    const { user } = useAuth();
    const dept = useDepartmentScope()!;
    const { data: catalog = [] } = useGetCatalogQuery();
    const { data: orders = [] } = useGetOrdersQuery();
    const { data: inventory = [] } = useGetInventoryQuery();

    const drinkIds = new Set(
        catalog.filter((p) => p.department === dept && BEVERAGE_CATEGORIES.includes(p.category)).map((p) => p.id),
    );
    const isBeverage = (o: Order) => isActive(o) && o.items.some((i) => drinkIds.has(i.productId));
    const beverageOrders = orders.filter((o) => orderInDept(o, dept) && isBeverage(o));
    const coffee = inventory.filter((i) => i.department === dept && i.category === 'Coffee');

    return (
        <DashboardShell title={`${DEPT_THEME[dept].label} Barista Dashboard`} subtitle={`Coffee station · ${user!.fullName}`}>
            <KpiGrid items={[
                { label: 'Open beverage orders', value: String(beverageOrders.length), icon: Coffee },
                { label: 'Ready to serve', value: String(beverageOrders.filter((o) => o.status === 'READY').length), icon: UtensilsCrossed },
                { label: 'Coffee stock', value: `${coffee.reduce((s, i) => s + i.quantity, 0)} kg`, hint: `${coffee.length} coffee items`, icon: Package },
                { label: 'Active orders', value: String(orders.filter((o) => orderInDept(o, dept) && isActive(o)).length), icon: ShoppingCart },
            ]} />
            <TwoColumn>
                <OrdersCard title="Beverage orders" department={dept} filter={isBeverage} />
                <Card title="Coffee inventory">
                    {!coffee.length && <p className="text-sm text-slate-400">No coffee items tracked.</p>}
                    <ul className="divide-y">
                        {coffee.map((i) => (
                            <li key={i.id} className="flex items-center justify-between py-2.5 text-sm">
                                <span><span className="font-medium">{i.name}</span> <span className="text-xs text-slate-500">· {i.quantity} {i.unit} (min {i.minStock})</span></span>
                                <StatusBadge status={getInventoryStatus(i)} />
                            </li>
                        ))}
                    </ul>
                </Card>
            </TwoColumn>
            <QuickActions items={[
                { to: '/orders/new', label: 'New order', access: ACCESS.createOrder },
                { to: '/inventory', label: 'Coffee inventory', access: ACCESS.inventory },
            ]} />
        </DashboardShell>
    );
}