import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useCreateRequisitionMutation, useGetRequisitionsQuery, useReviewRequisitionMutation } from '@/services/inventoryApi';
import { useAuth, useDepartmentScope } from '@/hooks/useAuth';
import { ACCESS } from '@/config/access';
import { formatDate } from '@/utils/format';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import type { Column } from '@/components/ui/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/LegacyButton';
import Modal from '@/components/ui/Modal';
import { Input, Select, Textarea } from '@/components/ui/Fields';
import type { OperatingDepartment, Requisition } from '@/types';

export default function RequisitionsPage() {
    const { user, can } = useAuth();
    const scope = useDepartmentScope();
    const { data, isLoading } = useGetRequisitionsQuery();
    const [create, { isLoading: saving }] = useCreateRequisitionMutation();
    const [review] = useReviewRequisitionMutation();
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        department: (scope ?? 'RESTAURANT') as OperatingDepartment, item: '', quantity: '1',
        priority: 'MEDIUM' as Requisition['priority'], reason: '', requiredDate: '',
    });

    const rows = (data ?? []).filter((r) => !scope || r.department === scope);
    const approver = can(ACCESS.requisitionApprove);

    const columns: Column<Requisition>[] = [
        { header: 'Department', render: (r) => r.department },
        { header: 'Item', render: (r) => <span className="font-medium">{r.item}</span> },
        { header: 'Quantity', render: (r) => r.quantity },
        { header: 'Priority', render: (r) => <StatusBadge status={r.priority} /> },
        { header: 'Reason', render: (r) => r.reason },
        { header: 'Required', render: (r) => formatDate(r.requiredDate) },
        { header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
        {
            header: 'Review',
            render: (r) => approver && r.status === 'PENDING' ? (
                <div className="flex gap-2">
                    <Button size="sm" onClick={() => review({ id: r.id, status: 'APPROVED', by: user!.fullName })}>Approve</Button>
                    <Button size="sm" variant="destructive" onClick={() => review({ id: r.id, status: 'REJECTED', by: user!.fullName })}>Reject</Button>
                </div>
            ) : null,
        },
    ];

    return (
        <>
            <PageHeader title="Inventory requisitions" subtitle="Request, review and approve stock"
                actions={<Button onClick={() => setOpen(true)}><Plus size={16} /> New request</Button>} />
            <DataTable columns={columns} data={rows} isLoading={isLoading} rowKey={(r) => r.id} />
            {open && (
                <Modal title="New requisition" onClose={() => setOpen(false)}
                    footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button loading={saving} disabled={!form.item}
                            onClick={async () => { await create({ ...form, quantity: Number(form.quantity) }).unwrap(); setOpen(false); }}>Submit</Button></>}>
                    <div className="space-y-3">
                        {!scope && <Select label="Department" value={form.department}
                            options={['RESTAURANT', 'BAKERY', 'DECORATION'].map((d) => ({ value: d, label: d }))}
                            onChange={(e) => setForm({ ...form, department: e.target.value as OperatingDepartment })} />}
                        <Input label="Item" value={form.item} onChange={(e) => setForm({ ...form, item: e.target.value })} />
                        <Input label="Quantity" type="number" min={1} value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
                        <Select label="Priority" value={form.priority} options={['LOW', 'MEDIUM', 'HIGH'].map((p) => ({ value: p, label: p }))}
                            onChange={(e) => setForm({ ...form, priority: e.target.value as Requisition['priority'] })} />
                        <Input label="Required date" type="date" value={form.requiredDate} onChange={(e) => setForm({ ...form, requiredDate: e.target.value })} />
                        <Textarea label="Reason" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} />
                    </div>
                </Modal>
            )}
        </>
    );
}