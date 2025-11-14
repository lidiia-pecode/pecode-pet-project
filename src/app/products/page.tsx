'use client';
import { useEffect, useMemo, useState } from 'react';
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
import { Product, ViewMode } from '@/types/Product';
import { ProductDetailsDrawer } from '@/components/products/ProductDetailsDrawer';
import { ViewModeSwitcher } from '@/components/products/ViewModeSwitcher';

export default function ProductPage() {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const { query, updateQuery } = useProductQuery();
  const handlers = useProductHandlers(query, updateQuery);
  const filters = useMemo(() => queryToFilters(query), [query]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState<ViewMode>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('productViewMode') as ViewMode) || 'grid';
    }
    return 'grid';
  });

    useEffect(() => {
      if (!isMobile) {
        localStorage.setItem('productViewMode', selectedMode);
      }
    }, [isMobile, selectedMode]);

    /** Derive effective mode */
    const currentMode: ViewMode = isMobile ? 'grid' : selectedMode;

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedProduct(null);
  };

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

          <Box
            sx={{
              ml: 'auto',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <ViewModeSwitcher
              mode={selectedMode}
              onSwitchMode={setSelectedMode}
            />
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
            onOpenProduct={handleOpenProduct}
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
        open={isDrawerOpen}
        product={selectedProduct}
        onClose={handleCloseDrawer}
      />
    </>
  );
}
