'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  useMediaQuery,
  useTheme,
  Pagination,
} from '@mui/material';
import { ProductList } from '@/components/products';
import { ActiveFiltersBar } from '@/components/filters/ActiveFiltersBar';
import { ProductFiltersBlock } from '@/components/products/ProductFiltersBlock';
import { useProductFilters } from '@/hooks/useProductFilters';
import { useProducts } from '@/hooks/useProducts';
import { PRODUCTS_PER_PAGE } from '@/lib/constants';
import { SortSelect } from '@/components/products/SortSelect';
import { SORT_OPTIONS, SortOption } from '@/types/sortOptions';
import { buildProductsQueryParams } from '@/lib/utils/buildProductsQueryParams';
import { useRouter } from 'next/navigation';
import { SearchBar } from '@/components/products/SearchBar';

export default function ProductPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [page, setPage] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sort, setSort] = useState<SortOption>(SORT_OPTIONS.POPULAR_DESC);

  const router = useRouter();

  const { filters, handleFilterChange, handleClearFilters, removeFilter } =
    useProductFilters();

  const { data, isLoading, isError } = useProducts({
    page,
    limit: PRODUCTS_PER_PAGE,
    filters,
    sort,
  });

  useEffect(() => {
    const params = buildProductsQueryParams({
      page,
      limit: PRODUCTS_PER_PAGE,
      filters,
      sort,
      forUrl: true,
    });

    const queryString = params.toString();
    router.replace(queryString ? `/products?${queryString}` : '/products', {
      scroll: false,
    });
  }, [page, sort, filters, router]);

  const toggleMobileFilters = () => setMobileOpen(prev => !prev);
  const handleSortChange = (value: SortOption) => setSort(value);

  const products = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  const filtersBlock = (
    <ProductFiltersBlock
      filters={filters}
      isMobile={isMobile}
      onChange={handleFilterChange}
      onClose={toggleMobileFilters}
      removeFilter={removeFilter}
      handleClearFilters={handleClearFilters}
    />
  );

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, px: 2 }}>
        <SearchBar
          searchQuery={filters.searchQuery ?? ''}
          onChangeQuery={handleFilterChange}
        />
        <SortSelect sort={sort} onChange={handleSortChange} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'end',
          px: 2,
          py: 1,
          minHeight: 56,
        }}
      >
        <Box sx={{ flex: 1, mr: 2 }}>
          {isMobile ? (
            <Button variant='outlined' onClick={toggleMobileFilters}>
              Filters
            </Button>
          ) : (
            <ActiveFiltersBar
              filters={filters}
              removeFilter={removeFilter}
              handleClearFilters={handleClearFilters}
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
            isLoading={isLoading}
            isError={isError}
          />
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color='primary'
            shape='rounded'
            sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
          />
        </Box>
      </Box>
    </>
  );
}
