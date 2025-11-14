'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Drawer, Pagination } from '@mui/material';
import { ProductList } from '@/components/products';
import { ProductFiltersBlock } from '@/components/products/ProductFiltersBlock';
import { ActiveFiltersBar } from '@/components/filters/ActiveFiltersBar';
import { SortSelect } from '@/components/products/SortSelect';
import { SearchBar } from '@/components/products/SearchBar';
import { useProductQuery } from '@/hooks/useProductQuery';
import { useProducts } from '@/hooks/useProducts';
import { useProductHandlers } from '@/hooks/useProductHandlers';
import { queryToFilters } from '@/lib/utils/productQuery';
import { useResponsive } from '@/hooks/useResponsive';
import { ViewModeSwitcher } from '@/components/products/ViewModeSwitcher';
import { ProductDetailsDrawer } from '@/components/products/ProductDetailsDrawer';
import { useProductPageStore } from '@/store/useProductPageStore';
import { useInitViewMode } from '@/hooks/useInitViewMode';

export default function ProductPage() {
  const { isTablet, isMobile } = useResponsive();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { query, updateQuery } = useProductQuery();
  const handlers = useProductHandlers(query, updateQuery);
  const filters = useMemo(() => queryToFilters(query), [query]);

  const { selectedProduct, openProduct, closeProduct, setViewMode } =
    useProductPageStore();

  const viewMode = useInitViewMode();
  const currentMode = isMobile ? 'grid' : viewMode;

  const toggleMobileFilters = () => setMobileOpen(prev => !prev);

  const { data, isError, isFetching } = useProducts({
    page: query.page,
    limit: query.limit,
    filters,
    sort: query.sort,
  });

  const isLoadingInitial = isFetching && !data;
  const products = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  const filtersBlock = (
    <ProductFiltersBlock
      filters={filters}
      isTablet={isTablet}
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
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
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

          <Box sx={{ ml: 'auto', display: { xs: 'none', sm: 'block' } }}>
            <ViewModeSwitcher mode={currentMode} onSwitchMode={setViewMode} />
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, p: 2 }}>
        {isTablet ? (
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

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            flexGrow: 1,
            minHeight: 520,
          }}
        >
          <ProductList
            products={products}
            isLoading={isLoadingInitial}
            isUpdating={isFetching}
            isError={isError}
            onOpenProduct={openProduct}
            mode={currentMode}
          />

          {!isLoadingInitial && !!products.length && totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={query.page}
              onChange={handlers.handlePageChange}
              color='primary'
              shape='rounded'
              sx={{ mt: 'auto', display: 'flex', justifyContent: 'center' }}
            />
          )}
        </Box>
      </Box>

      <ProductDetailsDrawer
        open={!!selectedProduct}
        product={selectedProduct}
        onClose={closeProduct}
      />
    </>
  );
}
