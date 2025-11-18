'use client';

import React from 'react';
import { Card, CardContent, Box, Typography, Button, SxProps } from '@mui/material';
import type { Product } from '@/types/Product';
import { baseStyles } from './ProductsCard.styles';
import { Theme } from '@emotion/react';

type Variant = 'grid' | 'list';

interface ProductsCardProps {
  product: Product;
  variant?: Variant;
  onClick?: (product: Product) => void;
  onView?: (product: Product) => void;
}

export const ProductsCard: React.FC<ProductsCardProps> = ({
  product,
  variant = 'grid',
  onClick,
  onView,
}) => {
  const image = product.images?.[0] ?? '/placeholder.png'; //   should add this fallback image !!!

  const handleCardClick = () => onClick?.(product);
  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onView?.(product);
  };

  // --- Об'єднані стилі ---
  const cardStyles: SxProps<Theme> = Object.assign(
    {},
    baseStyles.card,
    variant === 'grid' ? baseStyles.cardGrid : baseStyles.cardList,
    { py: variant === 'list' ? 1.5 : 0, px: variant === 'list' ? 1 : 0 }
  );

  const imageStyles =
    variant === 'grid' ? baseStyles.imageGrid : baseStyles.imageList;

  return (
    <Card
      sx={cardStyles}
      onClick={handleCardClick}
      role='button'
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') handleCardClick();
      }}
    >
      <Box component='img' src={image} alt={product.title} sx={imageStyles} />

      <CardContent sx={{ flexGrow: 1, p: variant === 'grid' ? 2 : 0 }}>
        <Typography sx={baseStyles.title}>{product.title}</Typography>
        <Typography sx={baseStyles.description}>
          {product.description}
        </Typography>
        <Typography sx={baseStyles.price}>${product.price}</Typography>
        {variant === 'list' && (
          <Typography variant='caption' color='text.secondary'>
            {product.category?.name}
          </Typography>
        )}
      </CardContent>

      <Button
        fullWidth={variant === 'grid'}
        size='small'
        variant='contained'
        onClick={handleView}
      >
        View
      </Button>
    </Card>
  );
};
