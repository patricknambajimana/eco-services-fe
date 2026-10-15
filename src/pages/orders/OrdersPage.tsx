import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Download, Plus } from 'lucide-react';
import { useGetOrdersQuery, useUpdateOrderStatusMutation } from '@/services/ordersApi';
import { useAuth, useDepartmentScope } from '@/hooks/useAuth';
import { ACCESS } from '@/config/access';
import { exportCsv } from '@/utils/csv';
import { formatCurrency, formatDateTime } from '@/utils/format';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import type { Column } from '@/components/ui/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/LegacyButton';
import { Input, Select } from '@/components/ui/Fields';
import type { Order, OrderStatus } from '@/types';

export const ORDER_FLOW: OrderStatus[] = ['PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'DELIVERING', 'COMPLETED'];
export const nextStatus = (s: OrderStatus): OrderStatus | undefined => ORDER_FLOW[ORDER_FLOW.indexOf(s) + 1];

export default function OrdersPage() {
    const navigate = useNavigate();
    const { user, can } = useAuth();
    const scope = useDepartmentScope();
    const { data: orders, isLoading } = useGetOrdersQuery();
    const [updateStatus, { isLoading: updating }] = useUpdateOrderStatusMutation();

    const [search, setSearch] = useState('');
    const [dept, setDept] = useState('');
    const [status, setStatus] = useState('');

    const filtered = useMemo(
        () => (orders ?? []).filter((o) =>
            (!scope || o.department === scope || o.department === 'MIXED') &&
            (!dept || o.department === dept) &&
            (!status || o.status === status) &&
            `${o.id} ${o.customerName}`.toLowerCase().includes(search.toLowerCase())),
        [orders, scope, dept, status, search],
    );

    const columns: Column<Order>[] = [
        { header: 'Order', render: (o) => <span className="font-medium">{o.id}</span> },
        { header: 'Customer', render: (o) => o.customerName },
        { header: 'Department', render: (o) => o.department },
        { header: 'Total', render: (o) => formatCurrency(o.total) },
        { header: 'Status', render: (o) => <StatusBadge status={o.status} /> },
        { header: 'Payment', render: (o) => <StatusBadge status={o.paymentStatus} /> },
        { header: 'Created', render: (o) => formatDateTime(o.createdAt) },
        {
            header: 'Action',
            render: (o) => {
                const next = nextStatus(o.status);
                return next ? (
                    <Button size="sm" variant="secondary" disabled={updating}
                        onClick={(e) => { e.stopPropagation(); updateStatus({ id: o.id, status: next, by: user!.fullName }); }}>
                        Mark {next.toLowerCase()}
                    </Button>
                ) : null;
            },
        },
    ];

    return (
        <>
            <PageHeader
                title="Orders" subtitle="Monitor and manage customer orders"
                actions={<>
                    <Button variant="secondary" onClick={() => exportCsv('orders.csv', filtered.map((o) => ({
                        Order: o.id, Customer: o.customerName, Department: o.department, Total: o.total, Status: o.status, Payment: o.paymentStatus,
                    })))}><Download size={16} /> Export</Button>
                    {can(ACCESS.createOrder) && (
                        <Link to="/orders/new"><Button><Plus size={16} /> New order</Button></Link>
                    )}
                </>}
            />
            <div className="mb-4 grid gap-3 sm:grid-cols-3">
                <Input placeholder="Search by order ID or customer" value={search} onChange={(e) => setSearch(e.target.value)} />
                {!scope && (
                    <Select value={dept} onChange={(e) => setDept(e.target.value)} placeholder="All departments"
                        options={['RESTAURANT', 'BAKERY', 'DECORATION', 'MIXED'].map((d) => ({ value: d, label: d }))} />
                )}
                <Select value={status} onChange={(e) => setStatus(e.target.value)} placeholder="All statuses"
                    options={ORDER_FLOW.map((s) => ({ value: s, label: s }))} />
            </div>
            <DataTable columns={columns} data={filtered} isLoading={isLoading} rowKey={(o) => o.id}
                onRowClick={(o) => navigate(`/orders/${o.id}`)} />
        </>
    );
}