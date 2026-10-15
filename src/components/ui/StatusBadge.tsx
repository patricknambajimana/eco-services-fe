import { humanize } from '@/utils/format';

const GREEN = ['ACTIVE', 'AVAILABLE', 'COMPLETED', 'PAID', 'APPROVED', 'READY', 'SERVED'];
const YELLOW = ['PENDING', 'LOW_STOCK', 'PLANNED', 'ON_LEAVE', 'RESERVED', 'CLEANING', 'NEW', 'MEDIUM'];
const BLUE = ['CONFIRMED', 'PREPARING', 'IN_PROGRESS', 'DELIVERING', 'OCCUPIED'];
const RED = ['CRITICAL', 'OUT_OF_STOCK', 'EXPIRED', 'SUSPENDED', 'REJECTED', 'UNPAID', 'HIGH'];

export default function StatusBadge({ status }: { status: string }) {
    const color = GREEN.includes(status) ? 'bg-green-100 text-green-700'
        : YELLOW.includes(status) ? 'bg-amber-100 text-amber-700'
            : BLUE.includes(status) ? 'bg-blue-100 text-blue-700'
                : RED.includes(status) ? 'bg-red-100 text-red-700'
                    : 'bg-slate-100 text-slate-600';
    return (
        <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>
            {humanize(status)}
        </span>
    );
}