import { useProducts } from '@/hooks/useProduct';
import { Navbar } from '@/components/home/NavBar';
import { HeroBanner } from './HeroBanner';
import { CategoryFilter } from '@/components/category/CategoryFilter';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductList } from '@/components/products/ProductList';
import { Footer } from '@/components/footer/Footer';
import { Package } from 'lucide-react';

export const HomePage = () => {
  const { filters, filteredProducts, updateFilters } = useProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar 
        searchTerm={filters.search} 
        onSearchChange={(value) => updateFilters({ search: value })} 
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Banner */}
        <HeroBanner />

        {/* Category Filter */}
        <CategoryFilter
          activeCategory={filters.category}
          onCategoryChange={(category) => updateFilters({ category })}
          viewMode={filters.viewMode}
          onViewModeChange={(mode) => updateFilters({ viewMode: mode })}
        />

        {/* Results Count */}
        <div className="flex justify-between items-center my-6">
          <p className="text-sm text-gray-500">
            Showing {filteredProducts.length} products
            {filters.search && ` for "${filters.search}"`}
          </p>
        </div>

        {/* Product Display */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or category filter</p>
          </div>
        ) : filters.viewMode === 'grid' ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <ProductList products={filteredProducts} />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};