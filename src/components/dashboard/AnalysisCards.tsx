import Card from '@/components/ui/LegacyCard';
import type { DashboardData } from '@/types';

export default function AnalysisCards({ items = [] }: { items?: DashboardData['analysis'] }) {
    if (!items?.length) return null;
    return (
        <section className="mt-6">
            <h2 className="mb-3 text-base font-semibold text-slate-900">Performance analysis</h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {items.map((item) => (
                    <Card key={item.label}>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.label}</p>
                        <p className="mt-2 text-2xl font-bold text-slate-900">{item.value}</p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">{item.detail}</p>
                    </Card>
                ))}
            </div>
        </section>
    );
}