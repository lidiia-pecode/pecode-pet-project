'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
} from '@mui/material';
import type { Product } from '@/types/Product';
import { baseStyles } from './ProductsCard.styles';
import { ProductRating } from '../shared/ProductRating';

interface ProductsCardProps {
  product: Product;
  onClick?: (product: Product) => void;
  onView?: (product: Product) => void;
}

export const ProductsCard: React.FC<ProductsCardProps> = ({
  product,
  onClick,
  onView,
}) => {
  const image = product.images?.[0] ?? '/placeholder.png';

  const handleCardClick = () => onClick?.(product);
  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onView?.(product);
  };

  return (
    <Card
      sx={baseStyles.cardGrid}
      onClick={handleCardClick}
      role='button'
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter') handleCardClick();
      }}
    >
      <Box
        component='img'
        src={image}
        alt={product.title}
        sx={baseStyles.imageGrid}
      />

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography sx={baseStyles.title}>{product.title}</Typography>

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

      <Button fullWidth size='small' variant='contained' onClick={handleView}>
        View
      </Button>
    </Card>
  );
};
