import { Link } from 'react-router-dom';
import Card from '@/components/ui/LegacyCard';
import StatusBadge from '@/components/ui/StatusBadge';
import {
    useGetBatchesQuery, useGetGiftsQuery, useGetKitchenQuery, useGetTablesQuery,
} from '@/services/operationsApi';
import { useGetInventoryQuery, useGetMovementsQuery, useGetSuppliersQuery } from '@/services/inventoryApi';
import { useAuth } from '@/hooks/useAuth';
import { ACCESS } from '@/config/access';
import { formatDate, formatDateTime, humanize } from '@/utils/format';
import { getInventoryStatus } from '@/utils/inventory';
import type { OperatingDepartment, TableStatus } from '@/types';

const Empty = ({ text }: { text: string }) => <p className="text-sm text-slate-400">{text}</p>;
const MoreLink = ({ to, label }: { to: string; label: string }) => (
    <Link to={to} className="text-xs font-medium text-brand-700 hover:underline">{label}</Link>
);

export function KitchenQueueCard() {
    const { can } = useAuth();
    const { data = [] } = useGetKitchenQuery(undefined, { pollingInterval: 15000 });
    const open = data.filter((t) => t.status !== 'SERVED');
    return (
        <Card title={`Kitchen queue (${open.length})`} actions={can(ACCESS.kitchen) ? <MoreLink to="/restaurant/kitchen" label="Open kitchen" /> : undefined}>
            {!open.length && <Empty text="No open tickets." />}
            <ul className="divide-y">
                {open.map((t) => (
                    <li key={t.id} className="flex items-start justify-between gap-3 py-2.5 text-sm">
                        <span>
                            <span className="font-medium">{t.orderId} · Table {t.table}</span>
                            <span className="block text-xs text-slate-500">{t.items.join(', ')}</span>
                        </span>
                        <StatusBadge status={t.status} />
                    </li>
                ))}
            </ul>
        </Card>
    );
}

const TILE: Record<TableStatus, string> = {
    AVAILABLE: 'border-green-200 bg-green-50',
    OCCUPIED: 'border-blue-200 bg-blue-50',
    RESERVED: 'border-amber-200 bg-amber-50',
    CLEANING: 'border-slate-200 bg-slate-50',
};

export function TablesCard() {
    const { can } = useAuth();
    const { data = [] } = useGetTablesQuery();
    return (
        <Card title={`Tables (${data.length})`} actions={can(ACCESS.tables) ? <MoreLink to="/restaurant/tables" label="Manage tables" /> : undefined}>
            <div className="mb-3 flex flex-wrap gap-3 text-xs">
                {(Object.keys(TILE) as TableStatus[]).map((s) => (
                    <span key={s} className="flex items-center gap-1"><StatusBadge status={s} /> {data.filter((t) => t.status === s).length}</span>
                ))}
            </div>
            <div className="grid grid-cols-4 gap-2">
                {data.map((t) => (
                    <div key={t.id} className={`rounded-lg border p-2 text-center ${TILE[t.status]}`}>
                        <p className="text-sm font-semibold">{t.number}</p>
                        <p className="text-[11px] text-slate-500">{t.seats} seats</p>
                    </div>
                ))}
            </div>
        </Card>
    );
}

export function BatchesCard() {
    const { can } = useAuth();
    const { data = [] } = useGetBatchesQuery();
    return (
        <Card title="Production batches" actions={can(ACCESS.batches) ? <MoreLink to="/bakery/batches" label="Open batches" /> : undefined}>
            {!data.length && <Empty text="No batches yet." />}
            <ul className="divide-y">
                {data.slice(0, 6).map((b) => (
                    <li key={b.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                        <span>
                            <span className="font-medium">{b.product}</span> <span className="text-xs text-slate-500">× {b.quantity}</span>
                            <span className="block text-xs text-slate-400">Expires {formatDateTime(b.expiresAt)}</span>
                        </span>
                        <StatusBadge status={b.status} />
                    </li>
                ))}
            </ul>
        </Card>
    );
}

export function GiftsCard() {
    const { can } = useAuth();
    const { data = [] } = useGetGiftsQuery();
    const rows = [...data].sort((a, b) => Number(a.status === 'COMPLETED') - Number(b.status === 'COMPLETED'));
    return (
        <Card title="Gift service requests" actions={can(ACCESS.gifts) ? <MoreLink to="/decoration/gifts" label="Open gift services" /> : undefined}>
            {!rows.length && <Empty text="No gift requests." />}
            <ul className="divide-y">
                {rows.slice(0, 6).map((g) => (
                    <li key={g.id} className="flex items-start justify-between gap-3 py-2.5 text-sm">
                        <span>
                            <span className="font-medium">{g.customer}</span>
                            <span className="block text-xs text-slate-500">{g.instructions} · {g.delivery}</span>
                        </span>
                        <StatusBadge status={g.status} />
                    </li>
                ))}
            </ul>
        </Card>
    );
}

export function ShowroomCard() {
    const { can } = useAuth();
    const { data = [] } = useGetInventoryQuery();
    const items = data.filter((i) => i.department === 'DECORATION');
    return (
        <Card title={`Showroom items (${items.length})`} actions={can(ACCESS.showroom) ? <MoreLink to="/decoration/showroom" label="Open showroom" /> : undefined}>
            <ul className="divide-y">
                {items.slice(0, 6).map((i) => (
                    <li key={i.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                        <span>
                            <span className="font-medium">{i.name}</span>
                            <span className="block text-xs text-slate-500">{i.displayLocation ?? 'Storage'} · {i.quantity} {i.unit}</span>
                        </span>
                        <StatusBadge status={getInventoryStatus(i)} />
                    </li>
                ))}
            </ul>
        </Card>
    );
}

export function SuppliersCard() {
    const { can } = useAuth();
    const { data = [] } = useGetSuppliersQuery();
    const rows = [...data].sort((a, b) => Number(a.paymentStatus === 'PAID') - Number(b.paymentStatus === 'PAID'));
    return (
        <Card title="Supplier payments" actions={can(ACCESS.suppliers) ? <MoreLink to="/inventory/suppliers" label="Open suppliers" /> : undefined}>
            <ul className="divide-y">
                {rows.map((s) => (
                    <li key={s.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                        <span>
                            <span className="font-medium">{s.name}</span>
                            <span className="block text-xs text-slate-500">{s.products} · last purchase {formatDate(s.lastPurchase)}</span>
                        </span>
                        <StatusBadge status={s.paymentStatus} />
                    </li>
                ))}
            </ul>
        </Card>
    );
}

export function MovementsCard({ department }: { department?: OperatingDepartment }) {
    const { can } = useAuth();
    const { data = [] } = useGetMovementsQuery();
    const rows = data.filter((m) => !department || m.department === department).slice(0, 6);
    return (
        <Card title="Recent stock movements" actions={can(ACCESS.movements) ? <MoreLink to="/inventory/movements" label="View all" /> : undefined}>
            {!rows.length && <Empty text="No movements yet." />}
            <ul className="divide-y">
                {rows.map((m) => (
                    <li key={m.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                        <span>
                            <span className="font-medium">{m.product}</span> <span className="text-xs text-slate-500">× {m.quantity}</span>
                            <span className="block text-xs text-slate-400">{humanize(m.type)} · {m.user}</span>
                        </span>
                        <span className="text-xs text-slate-400">{formatDateTime(m.date)}</span>
                    </li>
                ))}
            </ul>
        </Card>
    );
}