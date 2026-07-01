import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, Clock, Eye, ShoppingCart, Zap } from 'lucide-react';
import { type Product } from '@/types/product';

interface ProductListItemProps {
  product: Product;
}

export const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row">
      <div className="md:w-48 md:flex-shrink-0 relative">
        <div className="aspect-square md:aspect-auto md:h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-xl md:rounded-l-xl md:rounded-r-none flex items-center justify-center text-6xl">
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

      <div className="flex-1 p-6">
        <CardHeader className="p-0 pb-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription className="text-sm mt-1">
                {product.description}
              </CardDescription>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-restaurant-600">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
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

        <CardContent className="p-0 py-3">
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
        </CardContent>

        <CardFooter className="p-0 pt-3 flex flex-wrap gap-3">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Eye className="h-3 w-3" />
              View
            </Button>
            <Button size="sm" className="bg-restaurant-500 hover:bg-restaurant-600 gap-1">
              <ShoppingCart className="h-3 w-3" />
              Add to Cart
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};