'use client';

import { Box, Typography } from '@mui/material';
import { ProductCard } from './ProductCard';
import { Product } from '@/types/Product';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
}

export const ProductList = ({
  products,
  isLoading,
  isError,
}: ProductListProps) => {
  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading products</Typography>;
  if (!products.length) return <Typography>No products found</Typography>;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        },
        gap: 3,
      }}
    >
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  );
};
