import { PRODUCTS_PER_PAGE } from '@/lib/constants';
import { SORT_OPTIONS, SortOption } from './sortOptions';
import { Category, BASE_FILTERS } from './Filters';

export interface ProductQuery {
  page: number;
  limit: number;
  sort: SortOption;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  maxRating: number;
  categories: Category[];
  searchQuery: string;
}

export const DEFAULTS= {
  page: 1,
  limit: PRODUCTS_PER_PAGE,
  sort: SORT_OPTIONS.POPULAR_DESC,
  minPrice: BASE_FILTERS.price.min,
  maxPrice: BASE_FILTERS.price.max,
  minRating: BASE_FILTERS.rating.min,
  maxRating: BASE_FILTERS.rating.max,
  searchQuery: BASE_FILTERS.searchQuery,
};

