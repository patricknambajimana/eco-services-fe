import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useCreateMovementMutation, useGetInventoryQuery, useGetMovementsQuery } from '@/services/inventoryApi';
import { useAuth, useDepartmentScope } from '@/hooks/useAuth';
import { formatDateTime, humanize } from '@/utils/format';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import type { Column } from '@/components/ui/DataTable';
import Button from '@/components/ui/LegacyButton';
import Modal from '@/components/ui/Modal';
import { Input, Select } from '@/components/ui/Fields';
import type { MovementType, StockMovement } from '@/types';

const TYPES: MovementType[] = ['PURCHASE', 'TRANSFER_IN', 'TRANSFER_OUT', 'PRODUCTION_USAGE', 'SOLD', 'WASTED'];

export default function StockMovementsPage() {
    const { user } = useAuth();
    const scope = useDepartmentScope();
    const { data, isLoading } = useGetMovementsQuery();
    const { data: inventory = [] } = useGetInventoryQuery();
    const [create, { isLoading: saving }] = useCreateMovementMutation();
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ productId: '', type: 'PURCHASE' as MovementType, quantity: '1' });

    const rows = (data ?? []).filter((m) => !scope || m.department === scope);
    const items = inventory.filter((i) => !scope || i.department === scope);

    const columns: Column<StockMovement>[] = [
        { header: 'Date', render: (m) => formatDateTime(m.date) },
        { header: 'Product', render: (m) => <span className="font-medium">{m.product}</span> },
        { header: 'Quantity', render: (m) => m.quantity },
        { header: 'Type', render: (m) => humanize(m.type) },
        { header: 'Department', render: (m) => m.department },
        { header: 'User', render: (m) => m.user },
    ];

    return (
        <>
            <PageHeader title={scope ? `${scope} stock movements` : 'Stock movements'} subtitle={scope ? `Inventory flow for the ${scope.toLowerCase()} department` : 'Every inventory transaction'}
                actions={<Button onClick={() => setOpen(true)}><Plus size={16} /> Record movement</Button>} />
            <DataTable columns={columns} data={rows} isLoading={isLoading} rowKey={(m) => m.id} />
            {open && (
                <Modal title="Record stock movement" onClose={() => setOpen(false)}
                    footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button loading={saving} disabled={!form.productId}
                            onClick={async () => { await create({ ...form, quantity: Number(form.quantity), user: user!.fullName }).unwrap(); setOpen(false); }}>Save</Button></>}>
                    <div className="space-y-3">
                        <Select label="Product" value={form.productId} placeholder="Select product" options={items.map((i) => ({ value: i.id, label: i.name }))}
                            onChange={(e) => setForm({ ...form, productId: e.target.value })} />
                        <Select label="Movement type" value={form.type} options={TYPES.map((t) => ({ value: t, label: humanize(t) }))}
                            onChange={(e) => setForm({ ...form, type: e.target.value as MovementType })} />
                        <Input label="Quantity" type="number" min={1} value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
                    </div>
                </Modal>
            )}
        </>
    );
}