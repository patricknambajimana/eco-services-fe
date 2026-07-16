// components/dashboard/superadmin/BusinessGrowthChart.tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface GrowthDataPoint {
  month: string;
  newBusinesses: number;
}

const mockGrowthData: GrowthDataPoint[] = [
  { month: 'Jan', newBusinesses: 1 },
  { month: 'Feb', newBusinesses: 0 },
  { month: 'Mar', newBusinesses: 2 },
  { month: 'Apr', newBusinesses: 1 },
  { month: 'May', newBusinesses: 1 },
  { month: 'Jun', newBusinesses: 2 },
  { month: 'Jul', newBusinesses: 0 },
  { month: 'Aug', newBusinesses: 1 },
  { month: 'Sep', newBusinesses: 2 },
  { month: 'Oct', newBusinesses: 1 },
  { month: 'Nov', newBusinesses: 0 },
  { month: 'Dec', newBusinesses: 1 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const value = payload[0].value;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2">
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="text-sm font-bold text-gray-900">
        {value} new {value === 1 ? 'business' : 'businesses'}
      </p>
    </div>
  );
};

interface BusinessGrowthChartProps {
  data?: GrowthDataPoint[];
}

export const BusinessGrowthChart = ({ data = mockGrowthData }: BusinessGrowthChartProps) => {
  const maxValue = Math.max(...data.map((d) => d.newBusinesses));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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
            allowDecimals={false}
            width={32}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
          <Bar dataKey="newBusinesses" radius={[6, 6, 0, 0]} maxBarSize={32}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={
                  entry.newBusinesses === maxValue && maxValue > 0
                    ? 'var(--color-restaurant-600, #4f46e5)'
                    : 'var(--color-restaurant-300, #a5b4fc)'
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};