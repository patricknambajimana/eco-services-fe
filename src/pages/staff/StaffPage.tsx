import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { useCreateStaffMutation, useGetStaffQuery, useUpdateStaffMutation } from '@/services/staffApi';
import { useDepartmentScope } from '@/hooks/useAuth';
import { DEPARTMENT_OPTIONS, ROLES_BY_DEPARTMENT, roleLabel } from '@/config/roles';
import { getErrorMessage } from '@/utils/errors';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import type { Column } from '@/components/ui/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/LegacyButton';
import Modal from '@/components/ui/Modal';
import { Input, Select } from '@/components/ui/Fields';
import type { Department, StaffMember, StaffStatus } from '@/types';

const STATUSES: StaffStatus[] = ['ACTIVE', 'INACTIVE', 'SUSPENDED', 'ON_LEAVE'];

export default function StaffPage() {
    const scope = useDepartmentScope();
    const { data: staff, isLoading } = useGetStaffQuery();
    const [createStaff, { isLoading: creating }] = useCreateStaffMutation();
    const [updateStaff, { isLoading: updating }] = useUpdateStaffMutation();

    const [search, setSearch] = useState('');
    const [dept, setDept] = useState('');
    const [status, setStatus] = useState('');
    const [form, setForm] = useState<Partial<StaffMember> | null>(null);
    const [error, setError] = useState('');

    const filtered = useMemo(() => (staff ?? []).filter((s) =>
        (!scope || s.department === scope) && (!dept || s.department === dept) && (!status || s.status === status) &&
        `${s.fullName} ${s.role}`.toLowerCase().includes(search.toLowerCase())), [staff, scope, dept, status, search]);

    const openNew = () => {
        const department: Department = scope ?? 'RESTAURANT';
        setForm({ department, role: ROLES_BY_DEPARTMENT[department][0], status: 'ACTIVE' });
        setError('');
    };

    const save = async () => {
        if (!form?.fullName?.trim()) return setError('Full name is required.');
        try {
            if (form.id) await updateStaff(form as StaffMember & { id: string }).unwrap();
            else await createStaff(form).unwrap();
            setForm(null);
        } catch (e) { setError(getErrorMessage(e)); }
    };

    const columns: Column<StaffMember>[] = [
        { header: 'Name', render: (s) => <div><p className="font-medium">{s.fullName}</p><p className="text-xs text-slate-500">{s.email}</p></div> },
        { header: 'Department', render: (s) => s.department },
        { header: 'Position', render: (s) => roleLabel(s.role) },
        { header: 'Phone', render: (s) => s.phone },
        { header: 'Status', render: (s) => <StatusBadge status={s.status} /> },
        { header: '', render: (s) => <Button size="sm" variant="secondary" onClick={() => { setForm(s); setError(''); }}>Edit</Button> },
    ];

    return (
        <>
            <PageHeader title="Staff management" subtitle="Employees across all departments"
                actions={<Button onClick={openNew}><Plus size={16} /> Add staff</Button>} />
            <div className="mb-4 grid gap-3 sm:grid-cols-3">
                <Input placeholder="Search name or position" value={search} onChange={(e) => setSearch(e.target.value)} />
                {!scope && <Select value={dept} onChange={(e) => setDept(e.target.value)} placeholder="All departments" options={DEPARTMENT_OPTIONS} />}
                <Select value={status} onChange={(e) => setStatus(e.target.value)} placeholder="All statuses" options={STATUSES.map((s) => ({ value: s, label: s }))} />
            </div>
            <DataTable columns={columns} data={filtered} isLoading={isLoading} rowKey={(s) => s.id} />

            {form && (
                <Modal title={form.id ? 'Edit staff member' : 'Add staff member'} onClose={() => setForm(null)}
                    footer={<><Button variant="secondary" onClick={() => setForm(null)}>Cancel</Button><Button loading={creating || updating} onClick={save}>Save</Button></>}>
                    <div className="space-y-3">
                        <Input label="Full name" value={form.fullName ?? ''} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
                        <Input label="Phone" value={form.phone ?? ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                        <Input label="Email" type="email" value={form.email ?? ''} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        <Select label="Department" value={form.department} disabled={!!scope || !!form.id} options={DEPARTMENT_OPTIONS}
                            onChange={(e) => { const d = e.target.value as Department; setForm({ ...form, department: d, role: ROLES_BY_DEPARTMENT[d][0] }); }} />
                        <Select label="Position" value={form.role} options={ROLES_BY_DEPARTMENT[form.department ?? 'RESTAURANT'].map((r) => ({ value: r, label: roleLabel(r) }))}
                            onChange={(e) => setForm({ ...form, role: e.target.value as StaffMember['role'] })} />
                        <Select label="Status" value={form.status} options={STATUSES.map((s) => ({ value: s, label: s }))}
                            onChange={(e) => setForm({ ...form, status: e.target.value as StaffStatus })} />
                        {error && <p className="text-sm text-red-600">{error}</p>}
                    </div>
                </Modal>
            )}
        </>
    );
}