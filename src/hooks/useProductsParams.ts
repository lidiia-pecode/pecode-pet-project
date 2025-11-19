'use client';

import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  ProductFilters,
  defaultFilters,
  FilterKey,
  BASE_FILTERS,
} from '@/types/Filters';

import { SortOption } from '@/types/Sort';
import { parseFiltersFromSearchParams } from '@/lib/utils/parseFilters';
import { buildQueryString } from '@/lib/utils/buildQueryString';

function filtersChanged(a: ProductFilters, b: ProductFilters) {
  if (
    a.price.min !== b.price.min ||
    a.price.max !== b.price.max ||
    a.rating.min !== b.rating.min ||
    a.rating.max !== b.rating.max ||
    a.searchQuery !== b.searchQuery ||
    a.categories.length !== b.categories.length ||
    a.categories.some(c => !b.categories.includes(c))
  ) {
    return true;
  }
  return false;
}

export function useProductsParams() {
  const router = useRouter();
  const params = useSearchParams();

  const { page, filters, sortOption } = useMemo(() => {
    return parseFiltersFromSearchParams(params);
  }, [params]);

  const updateURL = useCallback(
    (updated: {
      filters?: ProductFilters;
      page?: number;
      sortOption?: SortOption;
    }) => {
      const next = buildQueryString({
        filters: updated.filters ?? filters,
        page: updated.page ?? page,
        sortOption: updated.sortOption ?? sortOption,
      });

      router.replace(`?${next}`, { scroll: false });
    },
    [filters, page, sortOption, router]
  );

  const updateFilters = useCallback(
    (changed: Partial<ProductFilters>) => {
      const merged = { ...filters, ...changed };
      const shouldResetPage = filtersChanged(filters, merged);

      updateURL({
        filters: merged,
        page: shouldResetPage ? 1 : page,
      });
    },
    [filters, page, updateURL]
  );

  const removeFilter = useCallback(
    (key: FilterKey) => {
      const updated = { ...filters };

      switch (key) {
        case 'price':
          updated.price = BASE_FILTERS.price;
          break;
        case 'rating':
          updated.rating = BASE_FILTERS.rating;
          break;
        case 'categories':
          updated.categories = [];
          break;
        case 'searchQuery':
          updated.searchQuery = '';
          break;
      }

      updateFilters(updated);
    },
    [filters, updateFilters]
  );

  const clearFilters = useCallback(() => {
    updateFilters(defaultFilters);
  }, [updateFilters]);

  const setSortOption = useCallback(
    (option: SortOption) => {
      const shouldResetPage = sortOption !== option;
      updateURL({
        sortOption: option,
        page: shouldResetPage ? 1 : page,
      });
    },
    [sortOption, page, updateURL]
  );

  const setSearchQuery = useCallback(
    (query: string) => {
      updateFilters({ searchQuery: query }); 
    },
    [updateFilters]
  );

  const setPage = useCallback(
    (page: number) => {
      updateURL({ page });
    },
    [updateURL]
  );

  return {
    filters,
    sortOption,
    currentPage: page,

    updateFilters,
    removeFilter,
    clearFilters,

    setSearchQuery,
    setSortOption,
    setPage,
  };
}
