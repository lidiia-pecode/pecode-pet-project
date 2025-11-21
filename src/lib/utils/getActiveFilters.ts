import { FilterKey, ProductFilters } from '@/types/Filters';

interface ActiveFilterItem {
  type: FilterKey;
  label: string;
}

export const getActiveFilters = (
  filters: ProductFilters
): ActiveFilterItem[] => {
  const active: ActiveFilterItem[] = [];

  filters.categories.forEach(cat => {
    active.push({ type: 'categories', label: cat });
  });

  if (filters.price.min !== 0 || filters.price.max !== 1000) {
    active.push({
      type: 'price',
      label: `$${filters.price.min} - $${filters.price.max}`,
    });
  }

  if (filters.rating.min !== 0 || filters.rating.max !== 5) {
    active.push({
      type: 'rating',
      label: `${filters.rating.min}★ - ${filters.rating.max}★`,
    });
  }

  return active;
};
