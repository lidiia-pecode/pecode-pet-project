'use client';

import { Box } from '@mui/material';
import { useProducts } from '@/hooks/useProducts';
import { ProductsCard } from '../ProductsCard/ProductsCard';
import { ProductsGridSkeleton } from './components/ProductsGridSkeleton';
import { EmptyState } from '../ProductsList/components/EmptyState';
import { cardViewStyles } from './ProductsGridView.styles';

export const ProductsGridView = () => {
  const { data, isLoading } = useProducts();

  if (isLoading) {
    return <ProductsGridSkeleton />;
  }

  if (!data?.products?.length) {
    return <EmptyState />;
  }

  return (
    <Box
      sx={cardViewStyles}
    >
      {data.products.map(product => (
        <ProductsCard key={product.id} product={product} />
      ))}
    </Box>
  );
};
