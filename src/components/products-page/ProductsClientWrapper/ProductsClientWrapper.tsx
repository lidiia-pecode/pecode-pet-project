'use client';

import {
  filtersSidebarStyles,
  mainContentStyles,
  productsContainerStyles,
} from './ProductsClientWrapper.styles';

import { ProductsPagination } from '../ProductsPagination';
import { ProductsList } from '../ProductsList';
import { ProductsTopBar } from '../ProductsTopBar';
import { FiltersBlock } from '../FiltersBlock';
import { useProductsStore } from '@/store/productsStore';
import { useResponsive } from '@/hooks/useResponsive';
import { Drawer, Box } from '@mui/material';
import { useProducts } from '@/hooks/useProducts';

export default function ProductClientWrapper() {
  const { data, isLoading } = useProducts();
  const { isTablet, isMobile } = useResponsive();

  const viewMode = useProductsStore(state => state.viewMode);
  const filtersOpened = useProductsStore(state => state.filtersOpened);
  const currentPage = useProductsStore(state => state.currentPage);
  const currentMode = isMobile ? 'grid' : viewMode;

  const closeFilters = useProductsStore(state => state.closeFilters);
  const setPage = useProductsStore(state => state.setPage);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <ProductsTopBar />

      <Box sx={mainContentStyles}>
        {isTablet ? (
          <Drawer
            open={filtersOpened}
            onClose={closeFilters}
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
    </>
  );
}
