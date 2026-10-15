import { useGetMenuQuery, useUpdateMenuItemMutation } from '@/services/operationsApi';
import { formatCurrency } from '@/utils/format';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import type { Column } from '@/components/ui/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/LegacyButton';
import type { MenuItem } from '@/types';

export default function MenuPage() {
    const { data, isLoading } = useGetMenuQuery();
    const [update] = useUpdateMenuItemMutation();

    const columns: Column<MenuItem>[] = [
        { header: 'Item', render: (m) => <span className="font-medium">{m.name}</span> },
        { header: 'Category', render: (m) => m.category },
        {
            header: 'Price (RWF)',
            render: (m) => (
                <input key={m.price} type="number" defaultValue={m.price} className="input w-28"
                    onBlur={(e) => Number(e.target.value) !== m.price && update({ id: m.id, price: Number(e.target.value) })} />
            ),
        },
        { header: 'Current', render: (m) => formatCurrency(m.price) },
        { header: 'Availability', render: (m) => <StatusBadge status={m.available ? 'AVAILABLE' : 'OUT_OF_STOCK'} /> },
        { header: '', render: (m) => <Button size="sm" variant="secondary" onClick={() => update({ id: m.id, available: !m.available })}>{m.available ? 'Disable' : 'Enable'}</Button> },
    ];

    return (
        <>
            <PageHeader title="Menu management" subtitle="Update prices and availability" />
            <DataTable columns={columns} data={data} isLoading={isLoading} rowKey={(m) => m.id} />
        </>
    );
}