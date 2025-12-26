'use client';

import { Box, CircularProgress } from '@mui/material';

import { styles } from './ProductsList.styles';
import { useProductsStore } from '@/store/productsStore';
import { ProductTable } from './components/TableView/ProductTable';
import { ProductsGridView } from './components/ProductsGridView';

export const ProductsList = () => {
  const viewMode = useProductsStore(state => state.viewMode);
  const hasHydrated = useProductsStore(state => state._hasHydrated);

  if (!hasHydrated) {
    return (
      <Box sx={styles.centeredBox}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>{viewMode === 'list' ? <ProductTable /> : <ProductsGridView />}</Box>
  );
};
