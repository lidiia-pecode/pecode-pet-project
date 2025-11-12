import { defaultFilters, ProductFilters } from '@/types/Filters';
import { SortOption, SORT_OPTIONS } from '@/types/sortOptions';
import { PRODUCTS_PER_PAGE } from '@/lib/constants';

const DEFAULTS = {
  page: 1,
  limit: PRODUCTS_PER_PAGE,
  sort: SORT_OPTIONS.POPULAR_DESC,
  price: defaultFilters.price,
  rating: defaultFilters.rating,
  categories: [] as string[],
};

interface BuildParamsProps {
  page: number;
  limit: number;
  filters: ProductFilters;
  sort: SortOption;
  forUrl?: boolean;
}

export function buildProductsQueryParams({
  page,
  limit,
  filters,
  sort,
  forUrl = false,
}: BuildParamsProps) {
  const params = new URLSearchParams();

  // ──────────────── Page / Limit / Sort ────────────────
  if (!forUrl || page !== DEFAULTS.page) params.set('page', page.toString());
  if (!forUrl || limit !== DEFAULTS.limit)
    params.set('limit', limit.toString());
  if (!forUrl || sort !== DEFAULTS.sort) params.set('sort', sort);

  // ──────────────── Price ────────────────
  if (!forUrl || filters.price.min !== DEFAULTS.price.min)
    params.set('minPrice', filters.price.min.toString());
  if (!forUrl || filters.price.max !== DEFAULTS.price.max)
    params.set('maxPrice', filters.price.max.toString());

  // ──────────────── Rating ────────────────
  if (!forUrl || filters.rating.min !== DEFAULTS.rating.min)
    params.set('minRating', filters.rating.min.toString());
  if (!forUrl || filters.rating.max !== DEFAULTS.rating.max)
    params.set('maxRating', filters.rating.max.toString());

  // ──────────────── Categories ────────────────
  if (!forUrl || filters.categories.length) {
    filters.categories.forEach(cat => params.append('category', cat));
  }
  // ──────────────── Search ────────────────
  if (!forUrl || filters.searchQuery) {
    params.set('searchQuery', filters.searchQuery ?? '');
  }

  return params;
}
