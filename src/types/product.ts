export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  isPopular: boolean;
  isNew: boolean;
  prepTime: string;
  department?: 'restaurant' | 'bakery' | 'decoration';
}

export interface ProductFilters {
  search: string;
  category: string;
  viewMode: 'grid' | 'list';
}
 
export interface CategoryOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}