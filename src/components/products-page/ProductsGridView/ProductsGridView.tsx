'use client';

import { Box } from '@mui/material';
import { useProducts } from '@/hooks/products/useProducts';
import { ProductsCard } from '../ProductsCard/ProductsCard';
import { ProductsGridSkeleton } from './components/ProductsGridSkeleton';
import { productsGridViewStyles } from './ProductsGridView.styles';
import { EmptyState } from './components/EmptyState';

export const ProductsGridView = () => {
  const { data, isLoading } = useProducts();

  if (isLoading) {
    return <ProductsGridSkeleton />;
  }

  if (!data?.products?.length) {
    return <EmptyState />;
  }

  return (
    <Box sx={productsGridViewStyles.cardsContainer}>
      {data.products.map(product => (
        <ProductsCard key={product.id} product={product} />
      ))}
    </Box>
  );
};
