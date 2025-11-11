'use client';

import { Box, Typography } from '@mui/material';
import { ProductCard } from './ProductCard';
import { useProducts } from '@/hooks/useProducts';

export const ProductList = () => {
  const { data: products, isLoading, isError } = useProducts();

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading products</Typography>;

  return (
    <>
      <Typography variant='h5' sx={{ mb: 3 }}>
        All Products
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 3,
        }}
      >
        {products?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
    </>
  );
};
