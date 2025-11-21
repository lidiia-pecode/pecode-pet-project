// import { PRODUCTS_PER_PAGE } from '@/lib/constants';
// import { SORT_OPTIONS, SortOption } from './Sort';
// import { BASE_FILTERS, CategorySlug, FilterKey, ProductFilters } from './Filters';

// export interface ProductQuery {
//   page: number;
//   limit: number;
//   sort: SortOption;
//   minPrice: number;
//   maxPrice: number;
//   minRating: number;
//   maxRating: number;
//   categories: CategorySlug[];
//   searchQuery: string;
// }

// export interface ProductHandlers {
//   handleFilterChange: (updates: Partial<ProductFilters>) => void;
//   handleSortChange: (sort: SortOption) => void;
//   handlePageChange: (_: unknown, page: number) => void;
//   handleClearFilters: () => void;
//   removeFilter: (type: FilterKey, value?: CategorySlug) => void;
// }

// export const DEFAULTS = {
//   page: 1,
//   limit: PRODUCTS_PER_PAGE,
//   sort: SORT_OPTIONS.POPULAR_DESC,
//   minPrice: BASE_FILTERS.price.min,
//   maxPrice: BASE_FILTERS.price.max,
//   minRating: BASE_FILTERS.rating.min,
//   maxRating: BASE_FILTERS.rating.max,
//   searchQuery: BASE_FILTERS.searchQuery,
// };


export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export type CategorySlug = Category['slug'];