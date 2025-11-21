'use client';

import React, { useCallback } from 'react';
import { Card, CardContent, Box, Typography, Button } from '@mui/material';
import type { Product } from '@/types/Product';
import { baseStyles } from './ProductsCard.styles';
import { ProductRating } from '../shared/ProductRating';
import { useRouter } from 'next/navigation';

interface ProductsCardProps {
  product: Product;
}
const ProductsCardComponent: React.FC<ProductsCardProps> = ({ product }) => {
  const image = product.images?.[0] ?? '/placeholder.png';

  const router = useRouter();
  const handleOpenProduct = useCallback(() => {
    router.push(`/products/${product.id}`);
  }, [router, product.id]);

  return (
    <Card
      sx={baseStyles.cardGrid}
      onClick={handleOpenProduct}
      role='button'
      tabIndex={0}
    >
      <Box
        component='img'
        src={image}
        alt={product.title}
        sx={baseStyles.imageGrid}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant='h6' sx={baseStyles.title}>{product.title}</Typography>

        <Typography sx={baseStyles.description}>
          {product.description}
        </Typography>

        <Box sx={baseStyles.priceRow}>
          <Typography sx={baseStyles.price}>${product.price}</Typography>

          <Box sx={{ ml: 1 }}>
            <ProductRating
              value={product.rating?.rate ?? 0}
              count={product.rating?.count}
              size='small'
              showCount={true}
            />
          </Box>
        </Box>
      </CardContent>

      <Button fullWidth variant='contained' size='large' sx={{borderRadius: 0}}>
        View
      </Button>
    </Card>
  );
};

export const ProductsCard = React.memo(ProductsCardComponent);
