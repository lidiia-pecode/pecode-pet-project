import { ProductFilters, defaultFilters } from '@/types/Filters';
import { SortOption, SORT_OPTIONS } from '@/types/Sort';

interface BuildQueryStringParams {
  filters: ProductFilters;
  page: number;
  sortOption: SortOption;
}

export function buildQueryString({
  filters,
  page,
  sortOption,
}: BuildQueryStringParams) {
  const params = new URLSearchParams();

  if (page !== 1) params.append('page', String(page));

  if (filters.price.min !== defaultFilters.price.min)
    params.append('minPrice', String(filters.price.min));
  if (filters.price.max !== defaultFilters.price.max)
    params.append('maxPrice', String(filters.price.max));

  if (filters.rating.min !== defaultFilters.rating.min)
    params.append('minRating', String(filters.rating.min));
  if (filters.rating.max !== defaultFilters.rating.max)
    params.append('maxRating', String(filters.rating.max));

  if (filters.categories.length > 0)
    filters.categories.forEach(cat => params.append('category', cat));

  if (filters.searchQuery) params.append('searchQuery', filters.searchQuery);

  if (sortOption !== SORT_OPTIONS.REVIEWS_DESC)
    params.append('sort', sortOption);

  return params.toString();
}
