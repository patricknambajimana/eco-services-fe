import { useGetBatchesQuery, useUpdateBatchMutation } from '@/services/operationsApi';
import { formatDateTime } from '@/utils/format';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import type { Column } from '@/components/ui/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/LegacyButton';
import type { BatchStatus, ProductionBatch } from '@/types';

const FLOW: BatchStatus[] = ['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'EXPIRED'];

export default function BatchesPage() {
    const { data, isLoading } = useGetBatchesQuery();
    const [update] = useUpdateBatchMutation();

    const columns: Column<ProductionBatch>[] = [
        { header: 'Batch', render: (b) => b.id },
        { header: 'Product', render: (b) => <span className="font-medium">{b.product}</span> },
        { header: 'Quantity', render: (b) => b.quantity },
        { header: 'Ingredients', render: (b) => b.ingredients },
        { header: 'Produced', render: (b) => formatDateTime(b.producedAt) },
        { header: 'Expires', render: (b) => formatDateTime(b.expiresAt) },
        { header: 'Status', render: (b) => <StatusBadge status={b.status} /> },
        {
            header: '',
            render: (b) => {
                const next = FLOW[FLOW.indexOf(b.status) + 1];
                return next ? <Button size="sm" variant="secondary" onClick={() => update({ id: b.id, status: next })}>Mark {next.replace('_', ' ').toLowerCase()}</Button> : null;
            },
        },
    ];

    return (
        <>
            <PageHeader title="Production batches" subtitle="Track bakery production from plan to expiry" />
            <DataTable columns={columns} data={data} isLoading={isLoading} rowKey={(b) => b.id} />
        </>
    );
}