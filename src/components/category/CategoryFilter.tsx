import { Button } from '@/components/ui/button';
import { UtensilsCrossed, Coffee, Store, Grid3x3, List } from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export const CategoryFilter = ({
  activeCategory,
  onCategoryChange,
  viewMode,
  onViewModeChange,
}: CategoryFilterProps) => {
  const categories = [
    { id: 'all', label: 'All Products', icon: null },
    { id: 'restaurant', label: 'Restaurant', icon: UtensilsCrossed },
    { id: 'bakery', label: 'Bakery', icon: Coffee },
    { id: 'decoration', label: 'Decoration', icon: Store },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t">
      {categories.map((cat) => (
        <Button
          key={cat.id}
          variant={activeCategory === cat.id ? 'default' : 'ghost'}
          size="sm"
          className={activeCategory === cat.id ? 'bg-restaurant-500 hover:bg-restaurant-600' : ''}
          onClick={() => onCategoryChange(cat.id)}
        >
          {cat.icon && <cat.icon className="h-4 w-4 mr-1" />}
          {cat.label}
        </Button>
      ))}
      
      <div className="flex-1"></div>
      
      <div className="flex items-center gap-1">
        <Button
          variant={viewMode === 'grid' ? 'default' : 'ghost'}
          size="sm"
          className={viewMode === 'grid' ? 'bg-restaurant-500 hover:bg-restaurant-600' : ''}
          onClick={() => onViewModeChange('grid')}
        >
          <Grid3x3 className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === 'list' ? 'default' : 'ghost'}
          size="sm"
          className={viewMode === 'list' ? 'bg-restaurant-500 hover:bg-restaurant-600' : ''}
          onClick={() => onViewModeChange('list')}
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};