import { Link } from 'react-router-dom';
import Card from '@/components/ui/LegacyCard';
import StatusBadge from '@/components/ui/StatusBadge';
import { useGetOrdersQuery } from '@/services/ordersApi';
import { useAuth } from '@/hooks/useAuth';
import { ACCESS } from '@/config/access';
import { formatCurrency, formatDateTime } from '@/utils/format';
import { deptTotal, orderInDept } from './helpers';
import type { OperatingDepartment, Order } from '@/types';

interface Props { title?: string; department?: OperatingDepartment; filter?: (o: Order) => boolean; limit?: number }

export default function OrdersCard({ title = 'Recent orders', department, filter, limit = 5 }: Props) {
    const { can } = useAuth();
    const { data = [], isLoading } = useGetOrdersQuery();
    const canOpen = can(ACCESS.orders);

    const rows = data
        .filter((o) => (!department || orderInDept(o, department)) && (!filter || filter(o)))
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .slice(0, limit);

    const row = (o: Order) => (
        <>
            <span>
                <span className="font-medium">{o.id}</span> · {o.customerName}
                <span className="block text-xs text-slate-400">{formatDateTime(o.createdAt)}</span>
            </span>
            <span className="flex items-center gap-3">
                <span className="font-medium">{formatCurrency(department ? deptTotal(o, department) : o.total)}</span>
                <StatusBadge status={o.status} />
            </span>
        </>
    );
    const cls = 'flex items-center justify-between gap-3 py-2.5 text-sm';

    return (
        <Card title={title}
            actions={canOpen ? <Link to="/orders" className="text-xs font-medium text-brand-700 hover:underline">View all</Link> : undefined}>
            {!isLoading && !rows.length && <p className="text-sm text-slate-400">No orders to show.</p>}
            <ul className="divide-y">
                {rows.map((o) => (
                    <li key={o.id}>
                        {canOpen
                            ? <Link to={`/orders/${o.id}`} className={`${cls} hover:bg-slate-50`}>{row(o)}</Link>
                            : <div className={cls}>{row(o)}</div>}
                    </li>
                ))}
            </ul>
        </Card>
    );
}