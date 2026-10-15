import { CircleDollarSign, CreditCard, TrendingDown, TrendingUp } from 'lucide-react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useAuth } from '@/hooks/useAuth';
import { ACCESS } from '@/config/access';
import { useGetRevenueReportQuery } from '@/services/reportsApi';
import { useGetOrdersQuery } from '@/services/ordersApi';
import { formatCurrency } from '@/utils/format';
import Card from '@/components/ui/LegacyCard';
import DashboardShell, { Block, TwoColumn } from '@/components/dashboard/DashboardShell';
import WithDashboardData from '@/components/dashboard/WithDashboardData';
import DepartmentStatements from '@/components/dashboard/DepartmentStatements';
import KpiGrid from '@/components/dashboard/KpiGrid';
import OrdersCard from '@/components/dashboard/OrdersCard';
import QuickActions from '@/components/dashboard/QuickActions';
import { SuppliersCard } from '@/components/dashboard/OperationsCards';

export default function AccountantDashboard() {
    const { user } = useAuth();
    const { data: revenue = [] } = useGetRevenueReportQuery();
    const { data: orders = [] } = useGetOrdersQuery();

    const rows = revenue.map((r) => {
        const total = r.restaurant + r.bakery + r.decoration;
        return { month: r.month, revenue: total, expenses: r.expenses, profit: total - r.expenses };
    });
    const last = rows[rows.length - 1];
    const unpaid = orders.filter((o) => o.paymentStatus === 'UNPAID');
    const margin = last && last.revenue ? ((last.profit / last.revenue) * 100).toFixed(1) : '0';

    return (
        <DashboardShell title="Accountant Dashboard" subtitle={`Financial overview · ${user!.fullName}`}>
            <WithDashboardData department="MANAGEMENT">
                {(data) => (
                    <>
                        <DepartmentStatements statements={data.departmentPerformance} />
                        <KpiGrid items={[
                            { label: `Revenue (${last?.month ?? '-'})`, value: formatCurrency(last?.revenue ?? 0), icon: TrendingUp },
                            { label: 'Expenses', value: formatCurrency(last?.expenses ?? 0), icon: TrendingDown },
                            { label: 'Net profit', value: formatCurrency(last?.profit ?? 0), hint: `${margin}% margin`, icon: CircleDollarSign },
                            { label: 'To collect', value: formatCurrency(unpaid.reduce((s, o) => s + o.total, 0)), hint: `${unpaid.length} unpaid orders`, icon: CreditCard },
                        ]} />
                        <Block>
                            <Card title="Revenue, expenses and profit">
                                <div className="h-72">
                                    <ResponsiveContainer>
                                        <LineChart data={rows}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                            <XAxis dataKey="month" fontSize={12} />
                                            <YAxis fontSize={12} tickFormatter={(v) => `${Number(v) / 1_000_000}M`} />
                                            <Tooltip formatter={(v) => formatCurrency(Number(v ?? 0))} /><Legend />
                                            <Line dataKey="revenue" name="Revenue" stroke="#a12661" strokeWidth={2} />
                                            <Line dataKey="expenses" name="Expenses" stroke="#ef4444" strokeWidth={2} />
                                            <Line dataKey="profit" name="Profit" stroke="#3b82f6" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                        </Block>
                        <TwoColumn>
                            <OrdersCard title="Unpaid orders" filter={(o) => o.paymentStatus === 'UNPAID'} />
                            <SuppliersCard />
                        </TwoColumn>
                        <QuickActions items={[
                            { to: '/reports', label: 'Financial reports', access: ACCESS.reports },
                            { to: '/settings', label: 'Settings' },
                        ]} />
                    </>
                )}
            </WithDashboardData>
        </DashboardShell>
    );
}