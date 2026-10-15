import { useState } from 'react';
import { useGetStaffQuery, useResetCredentialsMutation, useUpdateStaffMutation } from '@/services/staffApi';
import { roleLabel } from '@/config/roles';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import type { Column } from '@/components/ui/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/LegacyButton';
import Modal from '@/components/ui/Modal';
import type { StaffMember } from '@/types';

export default function CredentialsPage() {
    const { data, isLoading } = useGetStaffQuery();
    const [updateStaff] = useUpdateStaffMutation();
    const [reset] = useResetCredentialsMutation();
    const [result, setResult] = useState<{ name: string; pin: string } | null>(null);

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
                    <Button size="sm" variant="secondary"
                        onClick={() => updateStaff({ id: s.id, status: s.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' })}>
                        {s.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button size="sm" variant="secondary"
                        onClick={async () => setResult({ name: s.fullName, pin: (await reset(s.id).unwrap()).temporaryPin })}>
                        Reset PIN
                    </Button>
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
        </>
    );
}