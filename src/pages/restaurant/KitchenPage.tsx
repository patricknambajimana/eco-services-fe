import { useGetKitchenQuery, useUpdateKitchenMutation } from '@/services/operationsApi';
import { formatDateTime } from '@/utils/format';
import PageHeader from '@/components/ui/PageHeader';
import Button from '@/components/ui/LegacyButton';
import StatusBadge from '@/components/ui/StatusBadge';
import type { KitchenStatus } from '@/types';

const COLUMNS: KitchenStatus[] = ['NEW', 'PREPARING', 'READY', 'SERVED'];

export default function KitchenPage() {
    const { data = [] } = useGetKitchenQuery(undefined, { pollingInterval: 15000 });
    const [update] = useUpdateKitchenMutation();

    return (
        <>
            <PageHeader title="Kitchen display" subtitle="Live order tickets (auto-refreshes)" />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {COLUMNS.map((col, idx) => (
                    <div key={col} className="rounded-xl bg-slate-100 p-3">
                        <div className="mb-3 flex items-center justify-between"><StatusBadge status={col} /><span className="text-xs text-slate-500">{data.filter((t) => t.status === col).length}</span></div>
                        <div className="space-y-3">
                            {data.filter((t) => t.status === col).map((t) => (
                                <div key={t.id} className="rounded-lg bg-white p-3 shadow-sm">
                                    <p className="text-sm font-semibold">{t.orderId} · Table {t.table}</p>
                                    <ul className="my-2 text-sm text-slate-600">{t.items.map((i) => <li key={i}>{i}</li>)}</ul>
                                    <p className="mb-2 text-xs text-slate-400">{formatDateTime(t.createdAt)}</p>
                                    {COLUMNS[idx + 1] && (
                                        <Button size="sm" className="w-full" onClick={() => update({ id: t.id, status: COLUMNS[idx + 1] })}>
                                            Move to {COLUMNS[idx + 1].toLowerCase()}
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}