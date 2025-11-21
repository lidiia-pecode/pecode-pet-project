'use client';

import React, { useCallback } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Product } from '@/types/Product';
import { ProductRating } from '../shared/ProductRating';
import { listTableStyles } from './ProductsListTable.styles';
import { useRouter } from 'next/navigation';

const columns = [
  {
    key: 'image',
    label: 'Image',
    width: 'minmax(80px, 80px)',
    align: 'center',
    render: (product: Product) => (
      <Box
        component='img'
        src={product.images?.[0]}
        alt={product.title}
        sx={listTableStyles.image}
      />
    ),
  },

  {
    key: 'title',
    label: 'Title',
    width: 'minmax(160px, 1fr)',
    align: 'left',
    render: (product: Product) => (
      <Typography sx={listTableStyles.title} noWrap>
        {product.title}
      </Typography>
    ),
  },

  {
    key: 'price',
    label: 'Price',
    width: 'minmax(70px, 120px)',
    align: 'center',
    render: (product: Product) => <Typography>${product.price}</Typography>,
  },

  {
    key: 'rating',
    label: 'Rating',
    width: 'minmax(140px, 180px)',
    align: 'center',
    render: (product: Product) => (
      <Box>
        <ProductRating
          value={product.rating?.rate ?? 0}
          count={product.rating?.count}
          size='small'
          align='center'
        />
      </Box>
    ),
  },

  {
    key: 'action',
    label: 'Action',
    width: 'minmax(80px, 120px)',
    align: 'center',
    render: (product: Product, onOpenProduct?: (id: number) => void) => (
      <Button
        variant='contained'
        size='small'
        onClick={e => {
          e.stopPropagation();
          onOpenProduct?.(product.id);
        }}
      >
        View
      </Button>
    ),
  },
];

const ProductsListTableComponent = ({ products }: { products: Product[] }) => {
  const gridTemplateColumns = columns.map(c => c.width).join(' ');

  const router = useRouter();
  const handleOpenProduct = useCallback(
    (id: number) => {
      router.push(`/products/${id}`);
    },
    [router]
  );

  return (
    <Box>
      <Box sx={{ ...listTableStyles.header, gridTemplateColumns }}>
        {columns.map(col => (
          <Typography
            key={col.key}
            sx={{ textAlign: col.align, fontWeight: 600 }}
            noWrap
          >
            {col.label}
          </Typography>
        ))}
      </Box>

      {products.map(product => (
        <Box
          key={product.id}
          sx={{ ...listTableStyles.row, gridTemplateColumns }}
          onClick={() => handleOpenProduct(product.id)}
        >
          {columns.map(col => (
            <Box key={col.key} sx={{ textAlign: col.align }}>
              {col.render(product, handleOpenProduct)}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export const ProductsListTable = React.memo(ProductsListTableComponent);
