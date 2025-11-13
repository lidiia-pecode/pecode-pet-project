'use client';

import { Card, CardContent, CardActions, Button } from '@mui/material';
import { Product } from '@/types/Product';
import { ProductPreviewLayout } from './ProductPreviewLayout';

import { SxProps, Theme } from '@mui/material';

export const CARD_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 3,
  gap: 2,
  p: 2,
  pb: 3,
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'transform 0.15s ease',
  '&:hover': { transform: 'scale(1.02)' },
};

const MEDIA_SX: SxProps<Theme> = {
  height: 180,
  objectFit: 'contain',
};

const CONTENT_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  p: 0,
};

const TITLE_SX: SxProps<Theme> = {
  fontWeight: 500,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const PRICE_SX: SxProps<Theme> = {
  fontSize: 20,
  fontWeight: 500,
  color: 'text.secondary',
};

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <Card onClick={onClick} sx={CARD_SX}>
      <CardContent sx={CONTENT_SX}>
        <ProductPreviewLayout
          product={product}
          imageSx={MEDIA_SX}
          titleSx={TITLE_SX}
          priceSx={PRICE_SX}
          ratingSize='small'
        />
      </CardContent>

      <CardActions sx={{ p: 0 }}>
        <Button fullWidth variant='contained'>
          View
        </Button>
      </CardActions>
    </Card>
  );
};
