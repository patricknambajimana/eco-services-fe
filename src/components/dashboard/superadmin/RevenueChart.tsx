// components/dashboard/superadmin/RevenueChart.tsx
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RevenueDataPoint {
  month: string;
  revenue: number;
}

const mockRevenueData: RevenueDataPoint[] = [
  { month: 'Jan', revenue: 14200 },
  { month: 'Feb', revenue: 16800 },
  { month: 'Mar', revenue: 15400 },
  { month: 'Apr', revenue: 19200 },
  { month: 'May', revenue: 21500 },
  { month: 'Jun', revenue: 20100 },
  { month: 'Jul', revenue: 24800 },
  { month: 'Aug', revenue: 23600 },
  { month: 'Sep', revenue: 26200 },
  { month: 'Oct', revenue: 25400 },
  { month: 'Nov', revenue: 27900 },
  { month: 'Dec', revenue: 28450 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2">
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="text-sm font-bold text-gray-900">
        ${payload[0].value.toLocaleString()}
      </p>
    </div>
  );
};

interface RevenueChartProps {
  data?: RevenueDataPoint[];
}

export const RevenueChart = ({ data = mockRevenueData }: RevenueChartProps) => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-restaurant-500, #6366f1)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--color-restaurant-500, #6366f1)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#94a3b8' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            tickFormatter={(v) => `$${v / 1000}k`}
            width={48}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="var(--color-restaurant-600, #4f46e5)"
            strokeWidth={2.5}
            fill="url(#revenueGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};