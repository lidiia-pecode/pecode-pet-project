'use client';

import { Box, Typography } from '@mui/material';

import { styles } from './ProductsGridView.styles';
import { useProducts } from '@/hooks/products/useProducts';
import { ProductsCard } from '../ProductsCard';
import { ProductsGridSkeleton } from '../ProductsGridSkeleton';

export const ProductsGridView = () => {
  const { data, isLoading } = useProducts();

  if (isLoading) {
    return <ProductsGridSkeleton />;
  }

  if (!data?.products?.length) {
    return (
      <Box sx={styles.emptyContainer}>
        <Typography variant='h6' sx={styles.emptyTitle}>
          No products found
        </Typography>

        <Typography variant='body2' sx={styles.emptySubtitle}>
          Try adjusting your filters or search query
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.cardsContainer}>
      {data.products.map(product => (
        <ProductsCard key={product.id} product={product} />
      ))}
    </Box>
  );
};
