'use client';

import { Box, SxProps, Typography, Button } from '@mui/material';
import { Product } from '@/types/Product';
import { ProductRating } from './ui/ProductRating';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Theme } from '@mui/material/styles';

interface ProductPreviewLayoutProps {
  product: Product;
  sx?: SxProps<Theme>;
  imageSx?: SxProps<Theme>;
  titleSx?: SxProps<Theme>;
  priceSx?: SxProps<Theme>;
  ratingSize?: 'small' | 'medium' | 'large';
  onBuy?: (product: Product) => void;
  showBuyButton?: boolean;
}

export const ProductPreviewLayout = ({
  product,
  sx,
  imageSx,
  titleSx,
  priceSx,
  ratingSize = 'small',
  onBuy,
  showBuyButton = false,
}: ProductPreviewLayoutProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ...sx }}>
      <Box
        component='img'
        src={product.image}
        alt={product.title}
        style={{ width: '100%' }}
        sx={{ objectFit: 'contain', ...imageSx }}
      />

      <Typography variant='subtitle1' sx={titleSx}>
        {product.title}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <ProductRating
            value={product.rating?.rate ?? 0}
            count={product.rating?.count}
            size={ratingSize}
          />
          <Typography sx={priceSx}>${product.price}</Typography>
        </Box>

        {showBuyButton && (
          <Button
            variant='contained'
            onClick={() => onBuy?.(product)}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minWidth: { xs: 60, sm: 'auto' },
            }}
          >
            <Box
              component='span'
              sx={{ display: { xs: 'none', sm: 'inline' }, mr: 1 }}
            >
              Add to Cart
            </Box>

            <ShoppingCartIcon />
          </Button>
        )}
      </Box>
    </Box>
  );
};
