import { CircleDollarSign, CreditCard, Package, TrendingUp, Users } from 'lucide-react';
import { formatCurrency } from '@/utils/format';
import { DEPT_THEME } from './theme';
import type { DashboardData } from '@/types';

type Statements = NonNullable<DashboardData['departmentPerformance']>;

export default function DepartmentStatements({ statements = [], intro }: { statements?: Statements; intro?: boolean }) {
    if (!statements.length) return null;
    return (
        <div className="mb-6">
            {intro && (
                <section className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand-100 bg-gradient-to-r from-brand-50 via-white to-white p-5 shadow-sm">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">Financial control centre</p>
                        <h2 className="mt-1 text-lg font-semibold text-slate-900">Department statements</h2>
                        <p className="mt-1 max-w-2xl text-sm text-slate-500">Each department keeps its own revenue, people, profit and expense view.</p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-700 shadow-sm ring-1 ring-brand-100">Separate books</span>
                </section>
            )}
            <div className={`grid gap-4 ${statements.length > 1 ? 'xl:grid-cols-3' : ''}`}>
                {statements.map((s) => (
                    <section key={s.department} className={`rounded-2xl border p-5 shadow-sm ${DEPT_THEME[s.department].statement}`}>
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider opacity-70">Department statement</p>
                                <h2 className="mt-1 text-lg font-bold">{DEPT_THEME[s.department].label}</h2>
                            </div>
                            <CircleDollarSign size={24} aria-hidden="true" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: 'Revenue', value: formatCurrency(s.revenue), icon: TrendingUp },
                                { label: 'Users', value: String(s.users), icon: Users },
                                { label: 'Profit', value: formatCurrency(s.profit), icon: CreditCard },
                                { label: 'Expenses', value: formatCurrency(s.expenses), icon: Package },
                            ].map(({ label, value, icon: Icon }) => (
                                <div key={label} className="rounded-xl bg-white/75 p-3">
                                    <div className="flex items-center gap-1.5 text-[11px] font-medium opacity-70"><Icon size={13} /> {label}</div>
                                    <p className="mt-1 text-sm font-bold text-slate-900">{value}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}