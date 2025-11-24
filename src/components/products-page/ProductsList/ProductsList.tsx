'use client';

import { Box, CircularProgress } from '@mui/material';
import { useProductsStore } from '@/store/productsStore';
import { ProductsGridView } from '../ProductsGridView/ProductsGridView';
import { ProductsTableView } from '../ProductsTableView';
import { emptyBox } from './ProductsList.styles';

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
    <>
      {viewMode === 'list' ? (
        <ProductsTableView />
      ) : (
        <ProductsGridView />
      )}
    </>
  );
};
