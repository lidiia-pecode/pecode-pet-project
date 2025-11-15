import { useCallback } from 'react';
import {
  ProductFilters,
  Category,
  FilterKey,
  BASE_FILTERS,
} from '@/types/Filters';
import { SortOption } from '@/types/sortOptions';
import { ProductQuery } from '@/types/Query';
import { ProductHandlers } from '@/types/Handlers';

type UpdateQueryFn = (updates: Partial<ProductQuery>) => void;

export function useProductHandlers(
  query: ProductQuery,
  updateQuery: UpdateQueryFn
): ProductHandlers {
  const handleFilterChange = useCallback(
    (updates: Partial<ProductFilters>) => {
      const { searchQuery, price, rating, categories } = updates;

      const filtersChanged =
        (searchQuery != null && searchQuery !== query.searchQuery) ||
        (price?.min != null && price.min !== query.minPrice) ||
        (price?.max != null && price.max !== query.maxPrice) ||
        (rating?.min != null && rating.min !== query.minRating) ||
        (rating?.max != null && rating.max !== query.maxRating) ||
        (categories != null &&
          categories.join(',') !== query.categories.join(','));

      updateQuery({
        page: filtersChanged ? 1 : query.page,
        searchQuery: searchQuery ?? query.searchQuery,
        minPrice: price?.min ?? query.minPrice,
        maxPrice: price?.max ?? query.maxPrice,
        minRating: rating?.min ?? query.minRating,
        maxRating: rating?.max ?? query.maxRating,
        categories: categories ?? query.categories,
      });
    },
    [query, updateQuery]
  );

  const handleSortChange = useCallback(
    (sort: SortOption) => {
      if (sort !== query.sort) updateQuery({ sort, page: 1 });
    },
    [query.sort, updateQuery]
  );

  const handlePageChange = useCallback(
    (_: unknown, page: number) => {
      if (page !== query.page) updateQuery({ page });
    },
    [query.page, updateQuery]
  );

  const handleClearFilters = useCallback(
    () =>
      updateQuery({
        page: 1,
        searchQuery: BASE_FILTERS.searchQuery,
        minPrice: BASE_FILTERS.price.min,
        maxPrice: BASE_FILTERS.price.max,
        minRating: BASE_FILTERS.rating.min,
        maxRating: BASE_FILTERS.rating.max,
        categories: [],
      }),
    [updateQuery]
  );

  const removeFilter = useCallback(
    (type: FilterKey, value?: Category) => {
      const updates: Partial<ProductQuery> = { page: 1 };

      switch (type) {
        case 'categories':
          if (value) {
            const updatedCategories = query.categories.filter(c => c !== value);
            updates.categories = updatedCategories;
          }
          break;
        case 'price':
          updates.minPrice = BASE_FILTERS.price.min;
          updates.maxPrice = BASE_FILTERS.price.max;
          break;
        case 'rating':
          updates.minRating = BASE_FILTERS.rating.min;
          updates.maxRating = BASE_FILTERS.rating.max;
          break;
        case 'searchQuery':
          updates.searchQuery = BASE_FILTERS.searchQuery;
          break;
        default:
          break;
      }

      updateQuery(updates);
    },
    [query.categories, updateQuery]
  );

  return {
    handleFilterChange,
    handleSortChange,
    handlePageChange,
    handleClearFilters,
    removeFilter,
  };
}
