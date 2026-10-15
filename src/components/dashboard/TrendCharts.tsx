import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card from '@/components/ui/LegacyCard';
import type { DashboardData } from '@/types';

export default function TrendCharts({ data, color }: { data: DashboardData; color: string }) {
    return (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <Card title={data.trend.title}>
                <div className="h-64">
                    <ResponsiveContainer>
                        <LineChart data={data.trend.data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="name" fontSize={12} /><YAxis fontSize={12} /><Tooltip />
                            <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} />
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
                            <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
}