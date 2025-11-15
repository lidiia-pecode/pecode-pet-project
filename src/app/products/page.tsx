'use client';
import { Box, Button, Drawer, Pagination } from '@mui/material';
import { ProductList } from '@/components/products';
import { ProductFiltersBlock } from '@/components/products/ProductFiltersBlock';
import { ActiveFiltersBar } from '@/components/products/filters/ActiveFiltersBar';
import { SortSelect } from '@/components/products/SortSelect';
import { SearchBar } from '@/components/products/SearchBar';
import { ViewModeSwitcher } from '@/components/products/ViewModeSwitcher';
import { ProductDetailsDrawer } from '@/components/products/ProductDetailsDrawer';
import { useProductPage } from '@/hooks/useProductPage';
import * as styles from '../../components/products/styles/ProductPage.styles';

export default function ProductPage() {
  const {
    isTablet,
    isMobile,
    currentMode,
    isMobileFiltersOpen,
    products,
    totalPages,
    filters,
    query,
    isLoadingInitial,
    isFetching,
    isError,
    selectedProduct,
    handlers,
    setViewMode,
    toggleMobileFilters,
    closeMobileFilters,
    openProduct,
    closeProduct,
  } = useProductPage();

  const filtersBlock = (
    <ProductFiltersBlock
      filters={filters}
      isTablet={isTablet}
      onChange={handlers.handleFilterChange}
      onClose={closeMobileFilters}
      removeFilter={handlers.removeFilter}
      handleClearFilters={handlers.handleClearFilters}
    />
  );

  return (
    <>
      <Box sx={styles.searchBarContainerStyles}>
        <SearchBar
          searchQuery={filters.searchQuery ?? ''}
          onChangeQuery={handlers.handleFilterChange}
        />
        <SortSelect sort={query.sort} onChange={handlers.handleSortChange} />
      </Box>

      <Box sx={styles.filtersBarContainerStyles}>
        <Box sx={styles.filtersBarInnerStyles}>
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
          <Box sx={styles.viewModeSwitcherContainerStyles}>
            <ViewModeSwitcher
              mode={currentMode}
              onSwitchMode={setViewMode}
            />
          </Box>
        </Box>
      </Box>

      <Box sx={styles.mainContentStyles}>
        {isTablet ? (
          <Drawer
            open={isMobileFiltersOpen}
            onClose={closeMobileFilters}
            anchor='left'
            slotProps={{ paper: { sx: styles.drawerPaperStyles } }}
          >
            {filtersBlock}
          </Drawer>
        ) : (
          <Box sx={styles.filtersSidebarStyles}>{filtersBlock}</Box>
        )}

        <Box sx={styles.productsContainerStyles}>
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
              sx={styles.paginationStyles}
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
