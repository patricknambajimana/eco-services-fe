import { Link } from 'react-router-dom';
import { AlertTriangle, Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import {
    Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { useGetDashboardQuery } from '@/services/dashboardApi';
import { useAuth } from '@/hooks/useAuth';
import PageHeader from '@/components/ui/PageHeader';
import StatCard from '@/components/ui/StatCard';
import Card from '@/components/ui/LegacyCard';

const ICONS = [TrendingUp, ShoppingCart, Package, Users];
const QUICK_ACTIONS = [
    { to: '/orders/new', label: 'Create new order' },
    { to: '/orders', label: 'View orders' },
    { to: '/inventory', label: 'Manage inventory' },
    { to: '/reports', label: 'View reports' },
];

export default function DashboardPage() {
    const { user } = useAuth();
    const { data, isLoading, isError, error } = useGetDashboardQuery(user!.department);

    if (isLoading) return <p className="text-slate-400">Loading dashboard…</p>;
    if (isError || !data) {
        const message = error && 'message' in error ? error.message : 'The dashboard could not be loaded.';
        return <p className="text-red-600">{message}</p>;
    }

    return (
        <>
            <PageHeader title={data.title} subtitle={`Welcome back, ${user!.fullName}`} />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {data.stats.map((s, i) => <StatCard key={s.label} {...s} icon={ICONS[i % ICONS.length]} />)}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <Card title={data.trend.title}>
                    <div className="h-64">
                        <ResponsiveContainer>
                            <LineChart data={data.trend.data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="name" fontSize={12} /><YAxis fontSize={12} /><Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                <Card title={data.breakdown.title}>
                    <div className="h-64">
                        <ResponsiveContainer>
                            <BarChart data={data.breakdown.data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="name" fontSize={12} /><YAxis fontSize={12} /><Tooltip />
                                <Bar dataKey="value" fill="#22c55e" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <Card title="Alerts">
                    <ul className="space-y-2">
                        {data.alerts.map((a) => (
                            <li key={a} className="flex items-center gap-2 text-sm text-amber-700">
                                <AlertTriangle size={16} /> {a}
                            </li>
                        ))}
                    </ul>
                </Card>
                {user!.department === 'MANAGEMENT' && (
                    <Card title="Quick actions">
                        <div className="grid grid-cols-2 gap-3">
                            {QUICK_ACTIONS.map((q) => (
                                <Link key={q.to} to={q.to} className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium hover:border-brand-600 hover:bg-brand-50">
                                    {q.label}
                                </Link>
                            ))}
                        </div>
                    </Card>
                )}
            </div>
        </>
    );
}