import { useGetGiftsQuery, useUpdateGiftMutation } from '@/services/operationsApi';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import type { Column } from '@/components/ui/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/LegacyButton';
import type { GiftRequest } from '@/types';

const FLOW: GiftRequest['status'][] = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];

export default function GiftServicesPage() {
    const { data, isLoading } = useGetGiftsQuery();
    const [update] = useUpdateGiftMutation();

    const columns: Column<GiftRequest>[] = [
        { header: 'Customer', render: (g) => <span className="font-medium">{g.customer}</span> },
        { header: 'Instructions', render: (g) => g.instructions },
        { header: 'Delivery', render: (g) => g.delivery },
        { header: 'Status', render: (g) => <StatusBadge status={g.status} /> },
        {
            header: '',
            render: (g) => {
                const next = FLOW[FLOW.indexOf(g.status) + 1];
                return next ? <Button size="sm" variant="secondary" onClick={() => update({ id: g.id, status: next })}>Mark {next.replace('_', ' ').toLowerCase()}</Button> : null;
            },
        },
    ];

    return (
        <>
            <PageHeader title="Gift services" subtitle="Wrapping, customisation and delivery requests" />
            <DataTable columns={columns} data={data} isLoading={isLoading} rowKey={(g) => g.id} />
        </>
    );
}