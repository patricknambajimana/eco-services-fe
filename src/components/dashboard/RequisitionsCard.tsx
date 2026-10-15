import { Link } from 'react-router-dom';
import Card from '@/components/ui/LegacyCard';
import Button from '@/components/ui/LegacyButton';
import StatusBadge from '@/components/ui/StatusBadge';
import { useGetRequisitionsQuery, useReviewRequisitionMutation } from '@/services/inventoryApi';
import { useAuth } from '@/hooks/useAuth';
import { ACCESS } from '@/config/access';
import { formatDate } from '@/utils/format';
import type { OperatingDepartment } from '@/types';

export function usePendingRequisitions(department?: OperatingDepartment) {
    const { data = [] } = useGetRequisitionsQuery();
    return data.filter((r) => r.status === 'PENDING' && (!department || r.department === department));
}

export default function RequisitionsCard({ department }: { department?: OperatingDepartment }) {
    const { user, can } = useAuth();
    const pending = usePendingRequisitions(department);
    const [review, { isLoading }] = useReviewRequisitionMutation();
    const canReview = can(ACCESS.requisitionApprove);

    return (
        <Card title={`Pending requisitions (${pending.length})`}
            actions={can(ACCESS.requisitions) ? <Link to="/inventory/requisitions" className="text-xs font-medium text-brand-700 hover:underline">View all</Link> : undefined}>
            {!pending.length && <p className="text-sm text-slate-400">Nothing is waiting for approval.</p>}
            <ul className="divide-y">
                {pending.slice(0, 5).map((r) => (
                    <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm">
                        <div>
                            <p className="font-medium">{r.quantity} × {r.item}</p>
                            <p className="text-xs text-slate-500">{department ? '' : `${r.department} · `}{r.reason} · needed {formatDate(r.requiredDate)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <StatusBadge status={r.priority} />
                            {canReview && <>
                                <Button size="sm" disabled={isLoading} onClick={() => review({ id: r.id, status: 'APPROVED', by: user!.fullName })}>Approve</Button>
                                <Button size="sm" variant="destructive" disabled={isLoading} onClick={() => review({ id: r.id, status: 'REJECTED', by: user!.fullName })}>Reject</Button>
                            </>}
                        </div>
                    </li>
                ))}
            </ul>
        </Card>
    );
}