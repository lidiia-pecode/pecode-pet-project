'use client';

import { Box, CircularProgress, Typography } from '@mui/material';
import { ProductsCard } from '../ProductsCard/ProductsCard';
import { listStyles } from './ProductsList.styles';
import { ProductsListTable } from '../ProductsListTable';
import { useProducts } from '@/hooks/useProducts';
import { useResponsive } from '@/hooks/useResponsive';
import { useProductsStore } from '@/store/productsStore';
import { ProductsListTableSkeleton } from './components/ProductsListTableSkeleton';
import { ProductsGridSkeleton } from './components/ProductsGridSkeleton';

export const ProductsList = () => {
  const { data, isLoading } = useProducts();
  const { isMobile } = useResponsive();

  const viewMode = useProductsStore(state => state.viewMode);
  const mode = isMobile ? 'grid' : viewMode;

  if (!mode) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80%',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isLoading) {
    return mode === 'list' ? (
      <ProductsListTableSkeleton />
    ) : (
      <ProductsGridSkeleton />
    );
  }

  if (!data?.products || !data.products.length) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80%',
        }}
      >
        <Typography variant='h6' color='text.secondary'>
          No products Found
        </Typography>
      </Box>
    );
  }

  const products = data.products;

  return (
    <>
      {mode === 'list' ? (
        <ProductsListTable products={products} />
      ) : (
        <Box sx={listStyles.gridContainer}>
          {products.map(product => (
            <ProductsCard key={product.id} product={product} />
          ))}
        </Box>
      )}
    </>
  );
};
