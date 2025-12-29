'use client';

import { Box } from '@mui/material';

import { styles } from './ProductsGridView.styles';
import { useProducts } from '@/hooks/products/useProducts';
import { ProductsCard } from '../ProductsCard';
import { ProductsGridSkeleton } from '../ProductsGridSkeleton';
import { EmptyState } from '@/components/shared/EmptyState';

export const ProductsGridView = () => {
  const { data, isLoading } = useProducts();

  if (isLoading) {
    return <ProductsGridSkeleton />;
  }

  if (!data?.products?.length) {
    return (
      <EmptyState
        title='No products found'
        subtitle='Try adjusting your filters or search query'
      />
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
