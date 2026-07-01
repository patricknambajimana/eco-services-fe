import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Truck, Clock, Award, ArrowRight } from 'lucide-react';

export const HeroBanner = () => {
  return (
    <div className="bg-gradient-to-r from-restaurant-600 via-amber-600 to-purple-600 rounded-2xl p-8 mb-8 text-white shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6" />
            Discover Amazing Products
          </h1>
          <p className="text-white/80 mt-1">
            From fresh pastries to elegant decor - everything you need in one place
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <Badge className="bg-white/20 text-white border-0">
              <Truck className="h-3 w-3 mr-1" />
              Free Delivery Over $50
            </Badge>
            <Badge className="bg-white/20 text-white border-0">
              <Clock className="h-3 w-3 mr-1" />
              Fresh Daily
            </Badge>
            <Badge className="bg-white/20 text-white border-0">
              <Award className="h-3 w-3 mr-1" />
              Premium Quality
            </Badge>
          </div>
        </div>
        <div className="flex gap-3">
          <Button className="bg-white text-restaurant-700 hover:bg-gray-100 shadow-lg">
            View All
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};