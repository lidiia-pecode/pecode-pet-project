'use client';

import { Box, CircularProgress } from '@mui/material';
import { useProductsStore } from '@/store/productsStore';
import { ProductsGridView } from '../ProductsGridView/ProductsGridView';
import { emptyBox } from './ProductsList.styles';
import { ProductTable } from '../TableView/ProductTable';

export const ProductsList = () => {
  const viewMode = useProductsStore(state => state.viewMode);
  const hasHydrated = useProductsStore(state => state._hasHydrated);

  if (!hasHydrated) {
    return (
      <Box sx={emptyBox}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>{viewMode === 'list' ? <ProductTable /> : <ProductsGridView />}</Box>
  );
};
