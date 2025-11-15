'use client';
import { Drawer, Box, Typography, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Product } from '@/types/Product';
import { ProductPreviewLayout } from './ProductPreviewLayout';
import * as styles from './styles/ProductDetailsDrawer.styles';

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

  const handleBuy = () => {
    console.log('add to cart', product.id);
  };

  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: styles.drawerPaperStyles,
        },
      }}
    >
      <Box sx={styles.headerStyles}>
        <Typography variant='h5' sx={styles.titleStyles}>
          {product.title}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={styles.dividerStyles} />

      <ProductPreviewLayout
        product={product}
        imageSx={styles.previewImageStyles}
        titleSx={styles.previewTitleStyles}
        priceSx={styles.previewPriceStyles}
        ratingSize='medium'
        showBuyButton
        onBuy={handleBuy}
      />

      <Typography sx={styles.descriptionStyles}>
        {product.description}
      </Typography>
    </Drawer>
  );
};
