import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Printer } from 'lucide-react';
import { useGetOrderQuery, useUpdateOrderStatusMutation } from '@/services/ordersApi';
import { useAuth } from '@/hooks/useAuth';
import { formatCurrency, formatDateTime, humanize } from '@/utils/format';
import { nextStatus } from './OrdersPage';
import PageHeader from '@/components/ui/PageHeader';
import Card from '@/components/ui/LegacyCard';
import Button from '@/components/ui/LegacyButton';
import StatusBadge from '@/components/ui/StatusBadge';

const Row = ({ k, v }: { k: string; v: React.ReactNode }) => (
    <div className="flex justify-between py-1.5 text-sm"><span className="text-slate-500">{k}</span><span className="font-medium">{v}</span></div>
);

export default function OrderDetailsPage() {
    const { id } = useParams();
    const { user } = useAuth();
    const { data: order, isLoading, error } = useGetOrderQuery(id!);
    const [updateStatus, { isLoading: updating }] = useUpdateOrderStatusMutation();

    if (isLoading) return <p className="text-slate-400">Loading…</p>;
    if (error || !order) return <p className="text-red-600">Order not found.</p>;

    const next = nextStatus(order.status);
    const departments = [...new Set(order.items.map((i) => i.department))];

    return (
        <>
            <Link to="/orders" className="no-print mb-3 inline-flex items-center gap-1 text-sm text-brand-700"><ArrowLeft size={14} /> Back to orders</Link>
            <PageHeader
                title={`Order ${order.id}`}
                actions={<>
                    <Button variant="secondary" onClick={() => window.print()}><Printer size={16} /> Print receipt</Button>
                    {next && <Button loading={updating} onClick={() => updateStatus({ id: order.id, status: next, by: user!.fullName })}>Mark {next.toLowerCase()}</Button>}
                </>}
            />
            <div className="grid gap-6 lg:grid-cols-2">
                <Card title="Order information">
                    <Row k="Order ID" v={order.id} /><Row k="Date" v={formatDateTime(order.createdAt)} />
                    <Row k="Status" v={<StatusBadge status={order.status} />} /><Row k="Order type" v={order.department} />
                    {Object.entries(order.customization).map(([k, v]) => <Row key={k} k={humanize(k)} v={v} />)}
                </Card>
                <Card title="Customer information">
                    <Row k="Name" v={order.customerName} /><Row k="Phone" v={order.phone || '—'} /><Row k="Address" v={order.address || '—'} />
                </Card>
                <Card title="Department breakdown">
                    {departments.map((d) => (
                        <div key={d} className="mb-3">
                            <p className="text-xs font-semibold uppercase text-brand-700">{d}</p>
                            {order.items.filter((i) => i.department === d).map((i) => (
                                <Row key={i.productId} k={`${i.qty} × ${i.name}`} v={formatCurrency(i.qty * i.price)} />
                            ))}
                        </div>
                    ))}
                </Card>
                <Card title="Payment details">
                    <Row k="Amount" v={formatCurrency(order.total)} /><Row k="Method" v={humanize(order.paymentMethod)} />
                    <Row k="Payment status" v={<StatusBadge status={order.paymentStatus} />} />
                </Card>
                <Card title="Activity history" className="lg:col-span-2">
                    <ol className="space-y-2 text-sm">
                        {order.history.map((h, i) => (
                            <li key={i} className="flex justify-between border-b border-slate-100 pb-2">
                                <span>{h.action} <span className="text-slate-400">· {h.by}</span></span>
                                <span className="text-slate-400">{formatDateTime(h.at)}</span>
                            </li>
                        ))}
                    </ol>
                </Card>
            </div>
        </>
    );
}