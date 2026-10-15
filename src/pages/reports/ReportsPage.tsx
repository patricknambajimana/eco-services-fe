import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useGetRevenueReportQuery } from '@/services/reportsApi';
import { useAuth, useDepartmentScope } from '@/hooks/useAuth';
import { ACCESS } from '@/config/access';
import { formatCurrency } from '@/utils/format';
import PageHeader from '@/components/ui/PageHeader';
import Card from '@/components/ui/LegacyCard';
import StatCard from '@/components/ui/StatCard';
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react';

const COLORS = { restaurant: '#16a34a', bakery: '#f59e0b', decoration: '#3b82f6' } as const;
type Key = keyof typeof COLORS;

export default function ReportsPage() {
    const { can } = useAuth();
    const scope = useDepartmentScope();
    const { data = [], isLoading } = useGetRevenueReportQuery();

    const keys = (scope ? [scope.toLowerCase()] : Object.keys(COLORS)) as Key[];
    const rows = data.map((r) => ({ ...r, total: r.restaurant + r.bakery + r.decoration, profit: r.restaurant + r.bakery + r.decoration - r.expenses }));
    const sum = (f: (r: (typeof rows)[number]) => number) => rows.reduce((s, r) => s + f(r), 0);
    const showFinance = can(ACCESS.financial);

    if (isLoading) return <p className="text-slate-400">Loading reports…</p>;

    return (
        <>
            <PageHeader title="Reports & analytics" subtitle={scope ? `${scope} performance` : 'Cross-department performance'} />
            {showFinance && (
                <div className="mb-6 grid gap-4 sm:grid-cols-3">
                    <StatCard label="Total revenue" value={formatCurrency(sum((r) => r.total))} icon={DollarSign} />
                    <StatCard label="Total expenses" value={formatCurrency(sum((r) => r.expenses))} icon={TrendingDown} />
                    <StatCard label="Net profit" value={formatCurrency(sum((r) => r.profit))} icon={TrendingUp} />
                </div>
            )}
            <div className="grid gap-6 lg:grid-cols-2">
                <Card title="Monthly revenue by department">
                    <div className="h-72">
                        <ResponsiveContainer>
                            <BarChart data={rows}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /><XAxis dataKey="month" fontSize={12} />
                                <YAxis fontSize={12} tickFormatter={(v: number) => `${v / 1_000_000}M`} />
                                <Tooltip formatter={(v) => formatCurrency(Number(v))} /><Legend />
                                {keys.map((k) => <Bar key={k} dataKey={k} stackId="a" fill={COLORS[k]} />)}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                {showFinance && (
                    <Card title="Revenue vs expenses (profit & loss)">
                        <div className="h-72">
                            <ResponsiveContainer>
                                <LineChart data={rows}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /><XAxis dataKey="month" fontSize={12} />
                                    <YAxis fontSize={12} tickFormatter={(v: number) => `${v / 1_000_000}M`} />
                                    <Tooltip formatter={(v) => formatCurrency(Number(v))} /><Legend />
                                    <Line dataKey="total" name="Revenue" stroke="#16a34a" strokeWidth={2} />
                                    <Line dataKey="expenses" name="Expenses" stroke="#ef4444" strokeWidth={2} />
                                    <Line dataKey="profit" name="Profit" stroke="#3b82f6" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                )}
            </div>
        </>
    );
}