import { Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';
import type { DashboardData } from '@/types';

export interface Kpi { label: string; value: string; hint?: string; icon: LucideIcon }

const ICONS = [TrendingUp, ShoppingCart, Package, Users];

export const apiKpis = (stats: DashboardData['stats']): Kpi[] =>
    stats.map((s, i) => ({ ...s, icon: ICONS[i % ICONS.length] }));

export default function KpiGrid({ items }: { items: Kpi[] }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {items.map((k) => <StatCard key={k.label} {...k} />)}
        </div>
    );
}