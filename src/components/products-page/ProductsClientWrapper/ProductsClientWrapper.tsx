// components/products-page/ProductsClientWrapper/ProductsClientWrapper.tsx
'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getProducts } from '@/lib/api/products';
import { ProductsPagination } from '../ProductsPagination';
import { ProductsList } from '../ProductsList';
import { ProductsTopBar } from '../ProductsTopBar';
import { FiltersBlock } from '../FiltersBlock';
import { useProductsStore } from '@/store/productsStore';
import { useResponsive } from '@/hooks/useResponsive';
import { Drawer, Box, SxProps } from '@mui/material';
import { Theme } from '@emotion/react';
import { useProductsParams } from '@/hooks/useProductsParams';

const productsContainerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  flexGrow: 1,
  minHeight: 520,
};
const mainContentStyles: SxProps<Theme> = { display: 'flex', gap: 3 };
const filtersSidebarStyles: SxProps<Theme> = { width: 260, flexShrink: 0 };
const drawerPaperStyles: SxProps<Theme> = {
  width: { xs: '100%', sm: 500 },
  p: 3,
};

export default function ProductClientWrapper() {
  const { isTablet, isMobile } = useResponsive();
  const { viewMode, isMobileFiltersOpen, closeMobileFilters } =
    useProductsStore();
  const { currentPage, filters, sortOption, setPage } = useProductsParams();

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
            slotProps={{ paper: { sx: drawerPaperStyles } }}
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
