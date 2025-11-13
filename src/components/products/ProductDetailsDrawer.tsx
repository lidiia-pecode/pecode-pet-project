'use client';

import {
  Drawer,
  Box,
  Typography,
  Divider,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Product } from '@/types/Product';
import { ProductPreviewLayout } from './ProductPreviewLayout';

interface ProductDetailsDrawerProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailsDrawer = ({
  open,
  product,
  onClose,
}: ProductDetailsDrawerProps) => {
  if (!product) return null;

  const onBuy = () => { console.log('add to cart')};

  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: { width: { xs: '100%', sm: 500 }, p: 3 },
        },
      }}
    >
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography variant='h5' sx={{ fontWeight: 600 }}>
          {product.title}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ my: 2 }} />

      <ProductPreviewLayout
        product={product}
        imageSx={{ height: 300, borderRadius: 2 }}
        titleSx={{ visibility: 'hidden' }}
        priceSx={{ fontSize: 22, fontWeight: 600, mt: 0 }}
        ratingSize='medium'
        showBuyButton
        onBuy={onBuy}
      />

      <Typography sx={{ mt: 2 }}>{product.description}</Typography>
    </Drawer>
  );
};
