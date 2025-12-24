'use client';

import { Box, CircularProgress } from '@mui/material';
import { useProductsStore } from '@/store/productsStore';
import { ProductsGridView } from '../ProductsGridView/ProductsGridView';
import { ProductTable } from '../TableView/ProductTable';
import { centeredBox } from '../shared/styles';

export const ProductsList = () => {
  const viewMode = useProductsStore(state => state.viewMode);
  const hasHydrated = useProductsStore(state => state._hasHydrated);

  if (!hasHydrated) {
    return (
      <Box sx={centeredBox}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {viewMode === 'list' ? (
        <ProductTable />
      ) : (
        <ProductsGridView />
      )}
    </Box>
  );
};
