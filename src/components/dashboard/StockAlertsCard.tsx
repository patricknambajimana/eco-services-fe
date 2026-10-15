import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import Card from '@/components/ui/LegacyCard';
import StatusBadge from '@/components/ui/StatusBadge';
import { useGetInventoryQuery } from '@/services/inventoryApi';
import { useAuth } from '@/hooks/useAuth';
import { ACCESS } from '@/config/access';
import { getInventoryStatus } from '@/utils/inventory';
import type { OperatingDepartment } from '@/types';

const RANK: Record<string, number> = { EXPIRED: 0, OUT_OF_STOCK: 1, CRITICAL: 2, LOW_STOCK: 3 };
export const URGENT = ['EXPIRED', 'OUT_OF_STOCK', 'CRITICAL'];

export function useStockAlerts(department?: OperatingDepartment) {
    const { data = [] } = useGetInventoryQuery();
    return data
        .filter((i) => !department || i.department === department)
        .map((item) => ({ item, status: getInventoryStatus(item) }))
        .filter((a) => a.status !== 'AVAILABLE')
        .sort((a, b) => RANK[a.status] - RANK[b.status]);
}

export default function StockAlertsCard({ department, limit = 6 }: { department?: OperatingDepartment; limit?: number }) {
    const { can } = useAuth();
    const alerts = useStockAlerts(department);
    return (
        <Card title={`Stock alerts (${alerts.length})`}
            actions={can(ACCESS.inventory) ? <Link to="/inventory" className="text-xs font-medium text-brand-700 hover:underline">Open inventory</Link> : undefined}>
            {!alerts.length && <p className="text-sm text-slate-400">All stock levels are healthy.</p>}
            <ul className="divide-y">
                {alerts.slice(0, limit).map((a) => (
                    <li key={a.item.id} className="flex items-center justify-between py-2.5 text-sm">
                        <span className="flex items-center gap-2">
                            <AlertTriangle size={16} className="text-amber-600" />
                            <span>
                                <span className="font-medium">{a.item.name}</span>
                                <span className="text-xs text-slate-500"> · {a.item.quantity} {a.item.unit}{department ? '' : ` · ${a.item.department}`}</span>
                            </span>
                        </span>
                        <StatusBadge status={a.status} />
                    </li>
                ))}
            </ul>
        </Card>
    );
}