import { useState } from 'react';
import { KeyRound } from 'lucide-react';
import { useGetStaffQuery, useResetCredentialsMutation, useUpdateCredentialsMutation, useUpdateStaffMutation } from '@/services/staffApi';
import { roleLabel } from '@/config/roles';
import { useAuth } from '@/hooks/useAuth';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import type { Column } from '@/components/ui/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/LegacyButton';
import Modal from '@/components/ui/Modal';
import { Input } from '@/components/ui/Fields';
import { getErrorMessage } from '@/utils/errors';
import type { StaffMember } from '@/types';

export default function CredentialsPage() {
    const { user } = useAuth();
    const { data, isLoading } = useGetStaffQuery();
    const [updateStaff] = useUpdateStaffMutation();
    const [reset] = useResetCredentialsMutation();
    const [updateCredentials, { isLoading: updatingCredentials }] = useUpdateCredentialsMutation();
    const [result, setResult] = useState<{ name: string; pin: string } | null>(null);
    const [editing, setEditing] = useState<StaffMember | null>(null);
    const [password, setPassword] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');

    const columns: Column<StaffMember>[] = [
        { header: 'Employee', render: (s) => <span className="font-medium">{s.fullName}</span> },
        { header: 'Credential ID', render: (s) => <code className="rounded bg-slate-100 px-2 py-0.5">{s.credentialId}</code> },
        { header: 'Position', render: (s) => roleLabel(s.role) },
        { header: 'Department', render: (s) => s.department },
        { header: 'Status', render: (s) => <StatusBadge status={s.status} /> },
        {
            header: 'Actions',
            render: (s) => (
                <div className="flex gap-2">
                    {(user?.role === 'SUPER_ADMIN' || s.role !== 'SUPER_ADMIN') && <>
                        <Button size="sm" variant="secondary"
                            onClick={() => updateStaff({ id: s.id, status: s.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' })}>
                            {s.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button size="sm" variant="secondary"
                            onClick={async () => setResult({ name: s.fullName, pin: (await reset(s.id).unwrap()).temporaryPin })}>
                            Reset PIN
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => { setEditing(s); setPassword(''); setPin(''); setError(''); }}>
                            <KeyRound size={14} /> Update access
                        </Button>
                    </>}
                </div>
            ),
        },
    ];

    return (
        <>
            <PageHeader title="Credential management" subtitle="Activate, deactivate and reset employee access" />
            <DataTable columns={columns} data={data} isLoading={isLoading} rowKey={(s) => s.id} />
            {result && (
                <Modal title="Temporary PIN issued" onClose={() => setResult(null)}
                    footer={<Button onClick={() => setResult(null)}>Done</Button>}>
                    <p className="text-sm">New temporary PIN for <b>{result.name}</b>:</p>
                    <p className="my-3 text-center text-3xl font-bold tracking-widest text-brand-700">{result.pin}</p>
                    <p className="text-xs text-slate-500">Share securely. The employee should change it after logging in.</p>
                </Modal>
            )}
            {editing && (
                <Modal title={`Update access for ${editing.fullName}`} onClose={() => setEditing(null)}
                    footer={<><Button variant="secondary" onClick={() => setEditing(null)}>Cancel</Button>
                        <Button loading={updatingCredentials} onClick={async () => {
                            if (editing.role === 'SUPER_ADMIN' && user?.role !== 'SUPER_ADMIN') {
                                return setError('Only a Super Admin can update a Super Admin account.');
                            }
                            if (!password && !pin) return setError('Enter a new password or PIN.');
                            if (password && password.length < 8) return setError('Password must be at least 8 characters.');
                            if (pin && !/^\d{4,6}$/.test(pin)) return setError('PIN must contain 4 to 6 digits.');
                            try {
                                await updateCredentials({ id: editing.id, data: { password: password || undefined, pin: pin || undefined } }).unwrap();
                                setEditing(null);
                            } catch (e) { setError(getErrorMessage(e)); }
                        }}>Save access</Button></>}>
                    <div className="space-y-3">
                        <p className="rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
                            Passwords are never displayed or retrieved. Set a new password or PIN below.
                        </p>
                        <Input label="New password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
                        <Input label="New PIN" inputMode="numeric" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))} />
                        {error && <p className="text-sm text-red-600">{error}</p>}
                    </div>
                </Modal>
            )}
        </>
    );
}