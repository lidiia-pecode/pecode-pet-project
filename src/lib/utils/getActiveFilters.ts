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
    filters.price[0] !== defaultFilters.price[0] ||
    filters.price[1] !== defaultFilters.price[1]
  ) {
    active.push({
      type: 'price',
      label: `₴${filters.price[0]} - ₴${filters.price[1]}`,
      value: null,
    });
  }

  if (
    filters.rating[0] !== defaultFilters.rating[0] ||
    filters.rating[1] !== defaultFilters.rating[1]
  ) {
    active.push({
      type: 'rating',
      label: `${filters.rating[0]}★ - ${filters.rating[1]}★`,
      value: null,
    });
  }

  return active;
};
