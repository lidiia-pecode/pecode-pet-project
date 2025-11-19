'use client';

import {
  filtersSidebarStyles,
  mainContentStyles,
  productsContainerStyles,
} from './ProductsClientWrapper.styles';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getProducts } from '@/lib/api/products';
import { ProductsPagination } from '../ProductsPagination';
import { ProductsList } from '../ProductsList';
import { ProductsTopBar } from '../ProductsTopBar';
import { FiltersBlock } from '../FiltersBlock';
import { useProductsStore } from '@/store/productsStore';
import { useResponsive } from '@/hooks/useResponsive';
import { Drawer, Box } from '@mui/material';

export default function ProductClientWrapper() {
  const { isTablet, isMobile } = useResponsive();
  const {
    viewMode,
    isMobileFiltersOpen,
    closeMobileFilters,
    currentPage,
    filters,
    sortOption,
    setPage,
  } = useProductsStore();

  const { data, isLoading } = useQuery({
    queryKey: ['products', currentPage, filters, sortOption],
    queryFn: () =>
      getProducts({
        page: currentPage,
        filters,
        sortOption,
      }),
    placeholderData: keepPreviousData,
  });

  const currentMode = isMobile ? 'grid' : viewMode;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <ProductsTopBar />

      <Box sx={mainContentStyles}>
        {isTablet ? (
          <Drawer
            open={isMobileFiltersOpen}
            onClose={closeMobileFilters}
            anchor='left'
            slotProps={{ paper: { sx: { p: 2 } } }}
          >
            <FiltersBlock />
          </Drawer>
        ) : (
          <Box sx={filtersSidebarStyles}>
            <FiltersBlock />
          </Box>
        )}

        <Box sx={productsContainerStyles}>
          <ProductsList products={data?.products ?? []} mode={currentMode} />

          <ProductsPagination
            currentPage={currentPage}
            totalPages={data?.totalPages ?? 1}
            onChange={setPage}
          />
        </Box>
      </Box>
    </div>
  );
}
