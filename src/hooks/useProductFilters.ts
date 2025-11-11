import { useState } from 'react';
import { ProductFilters, defaultFilters, FilterKey } from '@/types/Filters';

export const useProductFilters = () => {
  const [filters, setFilters] = useState<ProductFilters>(defaultFilters);

  const handleFilterChange = (updated: Partial<ProductFilters>) =>
    setFilters(prev => ({ ...prev, ...updated }));

  const handleClearFilters = () => setFilters(defaultFilters);

  const removeFilter = (type: FilterKey, value: unknown) => {
    setFilters(prev => {
      switch (type) {
        case 'categories':
          return {
            ...prev,
            categories: prev.categories.filter(c => c !== value),
          };
        case 'price':
          return { ...prev, price: defaultFilters.price };
        case 'rating':
          return { ...prev, rating: defaultFilters.rating };
        default:
          return prev;
      }
    });
  };

  return { filters, handleFilterChange, handleClearFilters, removeFilter };
};
