import { Category, ProductFilters } from '@/types/Filters';
import { DEFAULTS, ProductQuery } from '@/types/Query';
import { SortOption } from '@/types/sortOptions';

export function parseQuery(searchParams: URLSearchParams): ProductQuery {
  return {
    page: Number(searchParams.get('page')) || DEFAULTS.page,
    limit: Number(searchParams.get('limit')) || DEFAULTS.limit,
    sort: (searchParams.get('sort') as SortOption) || DEFAULTS.sort,
    minPrice: Number(searchParams.get('minPrice')) || DEFAULTS.minPrice,
    maxPrice: Number(searchParams.get('maxPrice')) || DEFAULTS.maxPrice,
    minRating: Number(searchParams.get('minRating')) || DEFAULTS.minRating,
    maxRating: Number(searchParams.get('maxRating')) || DEFAULTS.maxRating,
    categories: (searchParams.getAll('category') as Category[]) || [],
    searchQuery: searchParams.get('searchQuery') || DEFAULTS.searchQuery,
  };
}

export function buildQuery(query: ProductQuery) {
  const params = new URLSearchParams();

  if (query.page !== DEFAULTS.page) params.set('page', String(query.page));
  if (query.limit !== DEFAULTS.limit) params.set('limit', String(query.limit));
  if (query.sort !== DEFAULTS.sort) params.set('sort', query.sort);
  if (query.minPrice !== DEFAULTS.minPrice)
    params.set('minPrice', String(query.minPrice));
  if (query.maxPrice !== DEFAULTS.maxPrice)
    params.set('maxPrice', String(query.maxPrice));
  if (query.minRating !== DEFAULTS.minRating)
    params.set('minRating', String(query.minRating));
  if (query.maxRating !== DEFAULTS.maxRating)
    params.set('maxRating', String(query.maxRating));
  query.categories.forEach(cat => params.append('category', cat));
  if (query.searchQuery) params.set('searchQuery', query.searchQuery);

  return params;
}

export function queryToFilters(query: ProductQuery): ProductFilters {
  return {
    price: { min: query.minPrice, max: query.maxPrice },
    rating: { min: query.minRating, max: query.maxRating },
    categories: query.categories,
    searchQuery: query.searchQuery,
  };
}
