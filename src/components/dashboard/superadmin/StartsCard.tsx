import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Building2, 
  Users, 
  DollarSign, 
  ShoppingBag
} from 'lucide-react';

interface StatsCardsProps {
  stats: {
    totalBusinesses: number;
    activeBusinesses: number;
    totalManagers: number;
    activeManagers: number;
    totalRevenue: number;
    totalOrders: number;
    growthRate: number;
    performance: {
      avgRating: number;
      completionRate: number;
      growthRate: number;
    };
  };
}

export const StatsCards = ({ stats }: StatsCardsProps) => {
  const cards = [
    {
      title: 'Total Businesses',
      value: stats.totalBusinesses,
      icon: Building2,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
      sub: `${stats.activeBusinesses} active`,
    },
    {
      title: 'Total Managers',
      value: stats.totalManagers,
      icon: Users,
      color: 'text-green-500',
      bg: 'bg-green-50',
      sub: `${stats.activeManagers} active`,
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-restaurant-500',
      bg: 'bg-restaurant-50',
      sub: `↑ ${stats.growthRate}% growth`,
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'text-purple-500',
      bg: 'bg-purple-50',
      sub: `↑ ${stats.performance.growthRate}% from last month`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              {card.title}
            </CardTitle>
            <div className={`${card.bg} p-2 rounded-lg`}>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{card.value}</div>
            <p className="text-xs text-gray-500 mt-1">{card.sub}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};