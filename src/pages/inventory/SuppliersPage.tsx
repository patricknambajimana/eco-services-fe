import { useGetSuppliersQuery } from '@/services/inventoryApi';
import { formatDate } from '@/utils/format';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import type { Column } from '@/components/ui/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';
import type { Supplier } from '@/types';

const columns: Column<Supplier>[] = [
    { header: 'Supplier', render: (s) => <span className="font-medium">{s.name}</span> },
    { header: 'Contact', render: (s) => s.contact },
    { header: 'Products supplied', render: (s) => s.products },
    { header: 'Last purchase', render: (s) => formatDate(s.lastPurchase) },
    { header: 'Payment', render: (s) => <StatusBadge status={s.paymentStatus} /> },
];

export default function SuppliersPage() {
    const { data, isLoading } = useGetSuppliersQuery();
    return (
        <>
            <PageHeader title="Suppliers" subtitle="Supplier directory and purchase history" />
            <DataTable columns={columns} data={data} isLoading={isLoading} rowKey={(s) => s.id} />
        </>
    );
}