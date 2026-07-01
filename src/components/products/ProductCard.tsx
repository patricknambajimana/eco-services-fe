import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, Clock, Eye, ShoppingCart, Zap } from 'lucide-react';
import { type Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-xl flex items-center justify-center text-6xl">
          {product.image}
        </div>
        {product.isPopular && (
          <Badge className="absolute top-2 left-2 bg-restaurant-500 text-white border-0">
            <Zap className="h-3 w-3 mr-1" />
            Popular
          </Badge>
        )}
        {product.isNew && (
          <Badge className="absolute top-2 left-2 bg-green-500 text-white border-0">
            New
          </Badge>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full w-8 h-8 p-0"
        >
          <Heart className="h-4 w-4 text-gray-500 hover:text-red-500" />
        </Button>
      </div>

      <CardHeader>
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <CardDescription className="text-sm mt-1">
          {product.description}
        </CardDescription>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            {product.rating}
            <span className="text-gray-400">({product.reviews})</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {product.prepTime}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <Badge variant="outline" className="text-xs">
          {product.category}
        </Badge>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <span className="text-2xl font-bold text-restaurant-600">
          ${product.price.toFixed(2)}
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Eye className="h-3 w-3" />
            View
          </Button>
          <Button size="sm" className="bg-restaurant-500 hover:bg-restaurant-600 gap-1">
            <ShoppingCart className="h-3 w-3" />
            Add
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};