// components/dashboard/superadmin/StatsCard.tsx
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  data: {
    title: string;
    value: number | string;
    icon: any;
    color: string;
    bg: string;
    change?: string;
    subtitle?: string;
  };
}

export const StatsCard = ({ data }: StatsCardProps) => {
  const isPositive = data.change?.startsWith('+');
  const isNegative = data.change?.startsWith('-');

  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-white">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-gray-500">
            {data.title}
          </p>
          <div className={cn("p-2.5 rounded-xl", data.bg)}>
            <data.icon className={cn("h-5 w-5", data.color)} />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {data.value}
            </p>
            {data.subtitle && (
              <p className="text-xs text-gray-500 mt-1">
                {data.subtitle}
              </p>
            )}
          </div>
          {data.change && (
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-lg",
              isPositive && "text-emerald-600 bg-emerald-50",
              isNegative && "text-red-600 bg-red-50",
              !isPositive && !isNegative && "text-gray-500 bg-gray-50"
            )}>
              {isPositive && <TrendingUp className="h-3 w-3" />}
              {isNegative && <TrendingDown className="h-3 w-3" />}
              <span>{data.change}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};