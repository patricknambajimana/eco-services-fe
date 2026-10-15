import { useMemo, useState } from 'react';
import { useGetInventoryQuery, useUpdateInventoryMutation } from '@/services/inventoryApi';
import { useDepartmentScope } from '@/hooks/useAuth';
import { getInventoryStatus } from '@/utils/inventory';
import { formatDate } from '@/utils/format';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import type { Column } from '@/components/ui/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/LegacyButton';
import Modal from '@/components/ui/Modal';
import { Input, Select } from '@/components/ui/Fields';
import type { InventoryItem } from '@/types';

export default function InventoryPage() {
    const scope = useDepartmentScope();
    const { data, isLoading } = useGetInventoryQuery();
    const [update, { isLoading: saving }] = useUpdateInventoryMutation();
    const [search, setSearch] = useState('');
    const [dept, setDept] = useState('');
    const [category, setCategory] = useState('');
    const [editing, setEditing] = useState<InventoryItem | null>(null);
    const [qty, setQty] = useState('0');

    const scoped = useMemo(() => (data ?? []).filter((i) => !scope || i.department === scope), [data, scope]);
    const filtered = scoped.filter((i) =>
        (!dept || i.department === dept) && (!category || i.category === category) &&
        i.name.toLowerCase().includes(search.toLowerCase()));
    const categories = [...new Set(scoped.map((i) => i.category))];

    const columns: Column<InventoryItem>[] = [
        { header: 'Product', render: (i) => <span className="font-medium">{i.name}</span> },
        { header: 'Category', render: (i) => i.category },
        { header: 'Department', render: (i) => i.department },
        { header: 'Quantity', render: (i) => `${i.quantity} ${i.unit}` },
        { header: 'Min stock', render: (i) => `${i.minStock} ${i.unit}` },
        { header: 'Expiry', render: (i) => (i.expiryDate ? formatDate(i.expiryDate) : '—') },
        { header: 'Status', render: (i) => <StatusBadge status={getInventoryStatus(i)} /> },
        { header: '', render: (i) => <Button size="sm" variant="secondary" onClick={() => { setEditing(i); setQty(String(i.quantity)); }}>Update</Button> },
    ];

    return (
        <>
            <PageHeader title={scope ? `${scope} inventory` : 'Inventory'} subtitle={scope ? `Stock levels for the ${scope.toLowerCase()} department` : 'Real-time stock levels'} />
            <div className="mb-4 grid gap-3 sm:grid-cols-3">
                <Input placeholder="Search items" value={search} onChange={(e) => setSearch(e.target.value)} />
                {!scope && <Select value={dept} onChange={(e) => setDept(e.target.value)} placeholder="All departments"
                    options={['RESTAURANT', 'BAKERY', 'DECORATION'].map((d) => ({ value: d, label: d }))} />}
                <Select value={category} onChange={(e) => setCategory(e.target.value)} placeholder="All categories"
                    options={categories.map((c) => ({ value: c, label: c }))} />
            </div>
            <DataTable columns={columns} data={filtered} isLoading={isLoading} rowKey={(i) => i.id} />
            {editing && (
                <Modal title={`Update stock: ${editing.name}`} onClose={() => setEditing(null)}
                    footer={<><Button variant="secondary" onClick={() => setEditing(null)}>Cancel</Button>
                        <Button loading={saving} onClick={async () => { await update({ id: editing.id, quantity: Number(qty) }).unwrap(); setEditing(null); }}>Save</Button></>}>
                    <Input label={`Quantity (${editing.unit})`} type="number" min={0} value={qty} onChange={(e) => setQty(e.target.value)} />
                </Modal>
            )}
        </>
    );
}