import { useState, useMemo } from 'react';
import {type Product, type ProductFilters } from '@/types/product';
import { MOCK_PRODUCTS } from '@/constants/product.constant';

export const useProducts = () => {
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: 'all',
    viewMode: 'grid',
  });

  const allProducts = useMemo(() => {
    return Object.values(MOCK_PRODUCTS).flat();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;
    
    if (filters.category !== 'all') {
      filtered = filtered.filter(p => p.department === filters.category);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }
    
    return filtered;
  }, [allProducts, filters]);

  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      viewMode: 'grid',
    });
  };

  return {
    filters,
    filteredProducts,
    updateFilters,
    resetFilters,
    allProducts,
  };
};