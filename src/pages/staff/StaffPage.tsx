import { useMemo, useState } from 'react';
import { Eye, EyeOff, KeyRound, Pencil, Plus, Trash2 } from 'lucide-react';
import { useCreateStaffMutation, useDeleteStaffMutation, useGetStaffQuery, useUpdateCredentialsMutation, useUpdateStaffMutation } from '@/services/staffApi';
import { useAuth, useDepartmentScope } from '@/hooks/useAuth';
import { DEPARTMENT_OPTIONS, ROLES_BY_DEPARTMENT, roleLabel } from '@/config/roles';
import { getErrorMessage } from '@/utils/errors';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import type { Column } from '@/components/ui/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/LegacyButton';
import Modal from '@/components/ui/Modal';
import { Input, Select } from '@/components/ui/Fields';
import type { CreateStaffPayload, Department, StaffMember, StaffStatus } from '@/types';

const STATUSES: StaffStatus[] = ['ACTIVE', 'INACTIVE', 'SUSPENDED', 'ON_LEAVE'];
const DEPARTMENT_IDS: Record<Exclude<Department, 'MANAGEMENT'>, number> = {
    RESTAURANT: 1,
    BAKERY: 2,
    DECORATION: 3,
};

export default function StaffPage() {
    const { user } = useAuth();
    const scope = useDepartmentScope();
    const { data: staff, isLoading } = useGetStaffQuery();
    const [createStaff, { isLoading: creating }] = useCreateStaffMutation();
    const [updateStaff, { isLoading: updating }] = useUpdateStaffMutation();
    const [updateCredentials] = useUpdateCredentialsMutation();
    const [deleteStaff, { isLoading: deleting }] = useDeleteStaffMutation();

    const [search, setSearch] = useState('');
    const [dept, setDept] = useState('');
    const [status, setStatus] = useState('');
    const [form, setForm] = useState<(Partial<StaffMember> & Partial<CreateStaffPayload>) | null>(null);
    const [passwordTarget, setPasswordTarget] = useState<StaffMember | null>(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);
    const [error, setError] = useState('');

    const filtered = useMemo(() => (staff ?? []).filter((s) =>
        (!scope || s.department === scope) && (!dept || s.department === dept) && (!status || s.status === status) &&
        `${s.fullName} ${s.role}`.toLowerCase().includes(search.toLowerCase())), [staff, scope, dept, status, search]);

    const openNew = () => {
        const department: Department = scope ?? 'RESTAURANT';
        setForm({
            department,
            role: ROLES_BY_DEPARTMENT[department][0],
            status: 'ACTIVE',
            username: '',
            password: '',
            pin: '',
        });
        setError('');
    };

    const save = async () => {
        if (!form?.fullName?.trim()) return setError('Full name is required.');
        if (form.id && form.role === 'SUPER_ADMIN' && user?.role !== 'SUPER_ADMIN') {
            return setError('Only a Super Admin can update a Super Admin account.');
        }
        try {
            if (form.id) {
                await updateStaff(form as StaffMember & { id: string }).unwrap();
            } else {
                if (!form.username?.trim()) return setError('Username / credential ID is required.');
                if (!form.password) return setError('Temporary password or PIN is required.');
                if (!form.department || !form.role) return setError('Department and position are required.');
                if (!form.pin?.trim()) return setError('PIN is required.');
                const username = form.username.trim();
                const alreadyExists = (staff ?? []).some((member) =>
                    member.credentialId.toLowerCase() === username.toLowerCase());
                if (alreadyExists) return setError(`Username "${username}" already exists. Choose a different username.`);
                await createStaff({
                    fullName: form.fullName.trim(),
                    email: form.email?.trim() ?? '',
                    phone: form.phone?.trim() ?? '',
                    ...(form.department !== 'MANAGEMENT' ? { departmentId: DEPARTMENT_IDS[form.department] } : {}),
                    status: form.status ?? 'ACTIVE',
                    roles: [form.role],
                    username,
                    password: form.password,
                    pin: form.pin.trim(),
                }).unwrap();
            }
            setForm(null);
        } catch (e) {
            setError(getErrorMessage(e));
        }
    };

    const remove = async (member: StaffMember) => {
        if (member.role === 'SUPER_ADMIN' && user?.role !== 'SUPER_ADMIN') {
            setError('General Managers and other users cannot delete a Super Admin account.');
            return;
        }
        if (member.id === user?.id) {
            setError('You cannot delete your own account.');
            return;
        }
        if (!window.confirm(`Delete ${member.fullName}'s user account? This cannot be undone.`)) return;
        try {
            await deleteStaff(member.id).unwrap();
        } catch (e) {
            setError(getErrorMessage(e));
        }
    };

    const openPasswordReset = (member: StaffMember) => {
        setPasswordTarget(member);
        setNewPassword('');
        setConfirmPassword('');
        setShowPassword(false);
        setError('');
    };

    const savePassword = async () => {
        if (!passwordTarget) return;
        if (newPassword.length < 8) return setError('Password must be at least 8 characters.');
        if (newPassword !== confirmPassword) return setError('Passwords do not match.');
        setSavingPassword(true);
        setError('');
        try {
            await updateCredentials({ id: passwordTarget.id, data: { password: newPassword } }).unwrap();
            setPasswordTarget(null);
            setNewPassword('');
            setConfirmPassword('');
        } catch (e) {
            setError(getErrorMessage(e));
        } finally {
            setSavingPassword(false);
        }
    };

    const columns: Column<StaffMember>[] = [
        { header: 'Name', render: (s) => <div><p className="font-medium">{s.fullName}</p><p className="text-xs text-slate-500">{s.email}</p></div> },
        { header: 'Department', render: (s) => s.department },
        { header: 'Position', render: (s) => roleLabel(s.role) },
        { header: 'Phone', render: (s) => s.phone },
        { header: 'Status', render: (s) => <StatusBadge status={s.status} /> },
        {
            header: 'Actions',
            render: (s) => (
                <div className="flex items-center gap-2">
                    {(user?.role === 'SUPER_ADMIN' || s.role !== 'SUPER_ADMIN') && (
                        <Button size="sm" variant="secondary" onClick={() => { setForm({ ...s }); setError(''); }}>
                            <Pencil size={14} /> Edit
                        </Button>
                    )}
                    {(user?.role === 'SUPER_ADMIN' || s.role !== 'SUPER_ADMIN') && (
                        <Button size="sm" variant="secondary" onClick={() => openPasswordReset(s)} aria-label={`Reset password for ${s.fullName}`}>
                            <KeyRound size={14} /> Reset password
                        </Button>
                    )}
                    {(user?.role === 'SUPER_ADMIN' || s.role !== 'SUPER_ADMIN') && s.id !== user?.id && (
                        <Button size="sm" variant="destructive" disabled={deleting} onClick={() => remove(s)} aria-label={`Delete ${s.fullName}`}>
                            <Trash2 size={14} />
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <>
            <PageHeader title={scope ? `${scope} staff` : 'Staff management'} subtitle={scope ? `People assigned to the ${scope.toLowerCase()} department` : 'Employees across all departments'}
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
                        {!form.id && <Input label="Username / Credential ID" value={form.username ?? ''} onChange={(e) => setForm({ ...form, username: e.target.value })} />}
                        {!form.id && <Input label="Temporary password / PIN" type="password" value={form.password ?? ''} onChange={(e) => setForm({ ...form, password: e.target.value })} />}
                        {!form.id && <Input label="PIN" inputMode="numeric" value={form.pin ?? ''} onChange={(e) => setForm({ ...form, pin: e.target.value.replace(/\D/g, '').slice(0, 6) })} />}
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
            {passwordTarget && (
                <Modal title={`Update password for ${passwordTarget.fullName}`} onClose={() => setPasswordTarget(null)}
                    footer={<><Button variant="secondary" onClick={() => setPasswordTarget(null)}>Cancel</Button>
                        <Button loading={savingPassword} onClick={savePassword}>Save password</Button></>}>
                    <div className="space-y-4">
                        <div className="relative">
                            <Input label="New password" type={showPassword ? 'text' : 'password'} value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)} autoComplete="new-password"
                                placeholder="Enter a new password" />
                            <button type="button" className="absolute right-3 top-7 text-slate-500 hover:text-brand-700"
                                onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                            </button>
                        </div>
                        <Input label="Confirm new password" type={showPassword ? 'text' : 'password'} value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password"
                            placeholder="Confirm the new password" />
                        <p className="text-xs text-slate-500">Use at least 8 characters. The new password is saved immediately.</p>
                        {error && <p className="text-sm text-red-600">{error}</p>}
                    </div>
                </Modal>
            )}
        </>
    );
}