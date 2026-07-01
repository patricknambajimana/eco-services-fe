import { type Product } from '@/types/product';
import { ProductListItem } from './ProductListItem';

interface ProductListProps {
  products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  );
};