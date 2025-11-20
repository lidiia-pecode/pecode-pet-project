'use client';

import { Box } from '@mui/material';
import { Product, ViewMode } from '@/types/Product';
import { ProductsCard } from '../ProductsCard/ProductsCard';
import { listStyles } from './ProductsList.styles';
import { ProductsListTable } from '../ProductsListTable';

interface ProductsListProps {
  products: Product[];
  mode: ViewMode;
}

export const ProductsList = ({ products, mode}: ProductsListProps) => {
  if (mode === 'list') {
    return (
      <ProductsListTable products={products}/>
    );
  }

  return (
    <Box sx={listStyles.gridContainer}>
      {products.map(product => (
        <ProductsCard
          key={product.id}
          product={product}
        />
      ))}
    </Box>
  );
};

