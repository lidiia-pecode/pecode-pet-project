import { FilterKey, ProductFilters, defaultFilters } from '@/types/Filters';

interface ActiveFilterItem {
  type: FilterKey;
  label: string;
  value: unknown;
}

export const getActiveFilters = (
  filters: ProductFilters
): ActiveFilterItem[] => {
  const active: ActiveFilterItem[] = [];

  if (filters.categories.length > 0) {
    filters.categories.forEach(cat => {
      active.push({ type: 'categories', label: cat, value: cat });
    });
  }

  if (
    filters.price.min !== defaultFilters.price.min||
    filters.price.max !== defaultFilters.price.max
  ) {
    active.push({
      type: 'price',
      label: `$${filters.price.min} - $${filters.price.max}`,
      value: null,
    });
  }

  if (
    filters.rating.min !== defaultFilters.rating.min ||
    filters.rating.max !== defaultFilters.rating.max
  ) {
    active.push({
      type: 'rating',
      label: `${filters.rating.min}★ - ${filters.rating.max}★`,
      value: null,
    });
  }

  return active;
};
