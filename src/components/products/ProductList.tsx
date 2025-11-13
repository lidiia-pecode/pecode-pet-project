'use client';

import { Box, Typography, CircularProgress } from '@mui/material';
import { ProductCard } from './ProductCard';
import { Product } from '@/types/Product';
import { theme } from '@/styles/theme';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  isUpdating: boolean;
  isError: boolean;
  onOpenProduct: (product: Product) => void;
}

export const ProductList = ({
  products,
  isLoading,
  isUpdating,
  isError,
  onOpenProduct,
}: ProductListProps) => {
  if (isError)
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant='h5' color='error'>
          Error loading products. Please try again.
        </Typography>
      </Box>
    );

  if (isLoading && !products.length)
    return (
      <Box sx={{ height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <CircularProgress size={40} color='primary' />
      </Box>
    ); 

  if (!isUpdating && !products.length)
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant='h6' color='text.secondary'>
          No products found matching your criteria.
        </Typography>
      </Box>
    );

  return (
    <Box sx={{ position: 'relative' }}>
      {isUpdating && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: `${theme.palette.background.default}d0`,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress size={40} color='primary' />
        </Box>
      )}

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
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => onOpenProduct(product)}
          />
        ))}
      </Box>
    </Box>
  );
};
