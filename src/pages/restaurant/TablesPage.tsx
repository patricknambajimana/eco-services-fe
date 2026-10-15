import { useGetTablesQuery, useUpdateTableMutation } from '@/services/operationsApi';
import PageHeader from '@/components/ui/PageHeader';
import Card from '@/components/ui/LegacyCard';
import StatusBadge from '@/components/ui/StatusBadge';
import { Select } from '@/components/ui/Fields';
import type { TableStatus } from '@/types';

const STATUSES: TableStatus[] = ['AVAILABLE', 'OCCUPIED', 'RESERVED', 'CLEANING'];

export default function TablesPage() {
    const { data = [], isLoading, isError, error } = useGetTablesQuery();
    const [update] = useUpdateTableMutation();

    return (
        <>
            <PageHeader title="Tables" subtitle="Floor layout and seating status" />
            {isLoading && <p className="text-slate-400">Loading…</p>}
            {isError && (
                <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
                    {'message' in error ? error.message : 'Unable to load restaurant tables.'}
                </p>
            )}
            {!isLoading && !isError && data.length === 0 && (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
                    <p className="font-medium text-slate-700">No restaurant tables found</p>
                    <p className="mt-1 text-sm text-slate-500">
                        Tables have not been created in the backend yet. Add one through the API, then refresh this page.
                    </p>
                </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {data.map((t) => (
                    <Card key={t.id}>
                        <div className="mb-3 flex items-center justify-between">
                            <div><p className="text-lg font-bold">{t.number}</p><p className="text-xs text-slate-500">{t.seats} seats</p></div>
                            <StatusBadge status={t.status} />
                        </div>
                        <Select value={t.status} options={STATUSES.map((s) => ({ value: s, label: s }))}
                            onChange={(e) => update({ id: t.id, status: e.target.value as TableStatus })} />
                    </Card>
                ))}
            </div>
        </>
    );
}