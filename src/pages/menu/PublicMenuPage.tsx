import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Download } from 'lucide-react';
import { useGetPublicMenuQuery } from '@/services/operationsApi';
import { OPERATING_DEPARTMENTS } from '@/config/roles';
import { DEPT_THEME } from '@/components/dashboard/theme';
import { downloadMenuPdf } from '@/utils/menuPdf';
import { formatCurrency } from '@/utils/format';
import { NotFoundPage } from '@/pages/ErrorPages';
import type { MenuItem, OperatingDepartment } from '@/types';

export default function PublicMenuPage() {
    const { dept: param = '' } = useParams();
    const dept = param.toUpperCase() as OperatingDepartment;
    const valid = OPERATING_DEPARTMENTS.includes(dept);
    const { data = [], isLoading, isError } = useGetPublicMenuQuery(dept, { skip: !valid });

    const groups = useMemo(() => {
        const map = new Map<string, MenuItem[]>();
        data.forEach((i) => map.set(i.category, [...(map.get(i.category) ?? []), i]));
        return [...map.entries()];
    }, [data]);

    if (!valid) return <NotFoundPage />;
    const theme = DEPT_THEME[dept];

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="px-5 pb-8 pt-6 text-white" style={{ backgroundColor: theme.chart }}>
                <div className="mx-auto max-w-2xl">
                    <p className="text-sm font-medium opacity-90">Eco-Service</p>
                    <h1 className="mt-1 text-3xl font-bold">{dept === 'DECORATION' ? 'Decoration Catalogue' : `${theme.label} Menu`}</h1>
                    <button disabled={!data.length} onClick={() => downloadMenuPdf(dept, data)}
                        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold disabled:opacity-60"
                        style={{ color: theme.chart }}>
                        <Download size={16} /> Download PDF menu
                    </button>
                </div>
            </header>

            <main className="mx-auto max-w-2xl space-y-6 px-4 py-6">
                {isLoading && <p className="text-center text-slate-400">Loading menu…</p>}
                {isError && <p className="text-center text-red-600">The menu could not be loaded. Please try again.</p>}
                {!isLoading && !isError && !groups.length && <p className="text-center text-slate-400">No items available right now.</p>}

                {groups.map(([category, items]) => (
                    <section key={category}>
                        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: theme.chart }}>{category}</h2>
                        <ul className="divide-y rounded-xl border border-slate-200 bg-white">
                            {items.map((i) => (
                                <li key={i.id} className="flex items-start justify-between gap-4 p-4">
                                    <div>
                                        <p className="font-medium">{i.name}</p>
                                        {i.description && <p className="text-sm text-slate-500">{i.description}</p>}
                                    </div>
                                    <span className="whitespace-nowrap font-semibold">{formatCurrency(i.price)}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
                <p className="pt-4 text-center text-xs text-slate-400">Prices are in Rwandan francs.</p>
            </main>
        </div>
    );
}