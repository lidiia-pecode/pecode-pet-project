'use client';

import * as styles from '@/components/products/styles/ProductPage.styles';
import { useMemo, useState } from 'react';
import { Box, Drawer, Pagination } from '@mui/material';
import { useProducts } from '@/hooks/useProducts';
import { queryToFilters } from '@/lib/utils/productQuery';
import { ProductList } from '@/components/products';
import { FiltersBlock } from './FiltersBlock';
import { TopBar } from '@/components/products/TopBar';
import { useProductQuery } from '@/hooks/useProductQuery';
import { useProductHandlers } from '@/hooks/useProductHandlers';
import { useResponsive } from '@/hooks/useResponsive';
import { useViewMode } from '@/hooks/useViewMode';
import { ProductQuery } from '@/types/Query';
import { Product } from '@/types/Product';
import { ProductDetailsDrawer } from './ProductDetailsDrawer';

interface ProductClientWrapperProps {
  initialQuery: ProductQuery;
}

export default function ProductClientWrapper({
  initialQuery,
}: ProductClientWrapperProps) {
  const { query, updateQuery } = useProductQuery(initialQuery);

  const handlers = useProductHandlers(query, updateQuery);
  const filters = useMemo(() => queryToFilters(query), [query]);

  const { isTablet, isMobile } = useResponsive();
  const { viewMode, setViewMode } = useViewMode();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const openProduct = (product: Product) => setSelectedProduct(product);
  const closeProduct = () => setSelectedProduct(null);
  const toggleMobileFilters = () => setIsMobileFiltersOpen(prev => !prev);
  const closeMobileFilters = () => setIsMobileFiltersOpen(false);

  const currentMode = isMobile ? 'grid' : viewMode;

  const { data, isError } = useProducts({
    page: query.page,
    limit: query.limit,
    filters,
    sort: query.sort,
  });

  const products = data?.products ?? [];
  const totalPages = data?.totalPages ?? 1;

  const filtersBlock = (
    <FiltersBlock
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
      <TopBar
        filters={filters}
        handlers={handlers}
        query={query}
        isTablet={isTablet}
        currentMode={viewMode}
        toggleMobileFilters={toggleMobileFilters}
        setViewMode={setViewMode}
      />

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
          {data && !isError && (
            <ProductList
              products={products}
              mode={currentMode}
              onOpenProduct={openProduct}
            />
          )}

          {products.length > 0 && totalPages > 1 && (
            <Pagination
              page={query.page}
              count={totalPages}
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
