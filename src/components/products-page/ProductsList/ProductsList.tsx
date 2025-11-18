'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { Product } from '@/types/Product';
import { ProductsCard } from '../ProductsCard/ProductsCard';
import { listStyles } from './ProductsList.styles';

type Variant = 'grid' | 'list';

interface ProductsListProps {
  products: Product[];
  variant?: Variant;
  onOpenProduct?: (product: Product) => void;
}

export const ProductsList: React.FC<ProductsListProps> = ({
  products,
  variant = 'grid',
  onOpenProduct,
}) => {
  if (!products.length) {
    return (
      <Box sx={listStyles.emptyBox}>
        <Typography variant='h6' color='text.secondary'>
          No products found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={variant === 'grid' ? listStyles.gridContainer : listStyles.container}
    >
      {products.map(product => (
        <ProductsCard
          key={product.id}
          product={product}
          variant={variant}
          onClick={onOpenProduct}
        />
      ))}
    </Box>
  );
};
