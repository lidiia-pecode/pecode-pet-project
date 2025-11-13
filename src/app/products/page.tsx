'use client';
import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  useMediaQuery,
  useTheme,
  Pagination,
} from '@mui/material';
import { ProductList } from '@/components/products';
import { ProductFiltersBlock } from '@/components/products/ProductFiltersBlock';
import { ActiveFiltersBar } from '@/components/filters/ActiveFiltersBar';
import { SortSelect } from '@/components/products/SortSelect';
import { SearchBar } from '@/components/products/SearchBar';
import { useProductQuery } from '@/hooks/useProductQuery';
import { useProducts } from '@/hooks/useProducts';
import { useProductHandlers } from '@/hooks/useProductHandlers';
import { queryToFilters } from '@/lib/utils/productQuery';

export default function ProductPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const { query, updateQuery } = useProductQuery();
  const handlers = useProductHandlers(query, updateQuery);
  const filters = useMemo(() => queryToFilters(query), [query]);

  const { data, isError, isFetching } = useProducts({
    page: query.page,
    limit: query.limit,
    filters,
    sort: query.sort,
  });
  const isLoadingInitial = isFetching && !data;
  const products = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  const toggleMobileFilters = () => setMobileOpen(prev => !prev);

  const filtersBlock = (
    <ProductFiltersBlock
      filters={filters}
      isMobile={isMobile}
      onChange={handlers.handleFilterChange}
      onClose={toggleMobileFilters}
      removeFilter={handlers.removeFilter}
      handleClearFilters={handlers.handleClearFilters}
    />
  );

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, px: 2 }}>
        <SearchBar
          searchQuery={filters.searchQuery ?? ''}
          onChangeQuery={handlers.handleFilterChange}
        />
        <SortSelect sort={query.sort} onChange={handlers.handleSortChange} />
      </Box>

      <Box
        sx={{ display: 'flex', alignItems: 'end', px: 2, py: 1, minHeight: 56 }}
      >
        <Box sx={{ flex: 1, mr: 2 }}>
          {isMobile ? (
            <Button variant='outlined' onClick={toggleMobileFilters}>
              Filters
            </Button>
          ) : (
            <ActiveFiltersBar
              filters={filters}
              removeFilter={handlers.removeFilter}
              handleClearFilters={handlers.handleClearFilters}
            />
          )}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, p: 2 }}>
        {isMobile ? (
          <Drawer
            open={mobileOpen}
            onClose={toggleMobileFilters}
            anchor='left'
            slotProps={{ paper: { sx: { width: 300 } } }}
          >
            {filtersBlock}
          </Drawer>
        ) : (
          <Box sx={{ width: 260, flexShrink: 0 }}>{filtersBlock}</Box>
        )}

        <Box sx={{ flexGrow: 1 }}>
          <ProductList
            products={products}
            isLoading={isLoadingInitial}
            isUpdating={isFetching}
            isError={isError}
          />
          {!isLoadingInitial && !!products.length && totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={query.page}
              onChange={handlers.handlePageChange}
              color='primary'
              shape='rounded'
              sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
            />
          )}
        </Box>
      </Box>
    </>
  );
}
