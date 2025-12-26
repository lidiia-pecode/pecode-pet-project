'use client';

import React, { useState } from 'react';
import { Card, CardContent, Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

import { styles } from './ProductsCard.styles';
import type { Product } from '@/types/Product';
import { deleteProductById } from '@/lib';
import { useProducts } from '@/hooks/products/useProducts';
import { useAlert } from '@/hooks/useAlert';

import { DeleteButton } from '@/components/shared/DeleteButton';
import { Alerts } from '@/components/shared/Alerts';
import { ProductRating } from '@/components/shared/ProductRating';
import { useModalToggle } from '@/hooks/products/useModal';

interface ProductsCardProps {
  product: Product;
}
const ProductsCardComponent = ({ product }: ProductsCardProps) => {
  const image = product.images?.[0] ?? '/placeholder.png';

  const router = useRouter();
  const handleOpenProduct = () => {
    router.push(`/products/${product.id}`);
  };

  const refetch = useProducts().refetch;
  const alert = useAlert();
  const { isOpen, toggle } = useModalToggle();
  const [loading, setLoading] = useState(false);

  const toggleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggle();
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteProductById(product.id);
      alert.success('Product deleted!');
      refetch();
      toggle();
    } catch (err) {
      alert.error('Failed to delete product');
      console.log(err);
      toggle();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={styles.cardGrid}
      onClick={handleOpenProduct}
      role='button'
      tabIndex={0}
    >
      <Box
        component='img'
        src={image}
        alt={product.title}
        sx={styles.imageGrid}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant='h6' sx={styles.title}>
          {product.title}
        </Typography>

        <Typography sx={styles.description}>{product.description}</Typography>

        <Box sx={styles.priceRow}>
          <Typography sx={styles.price}>${product.price}</Typography>

          <Box sx={styles.ratingWrapper}>
            <ProductRating
              value={product.rating?.rate ?? 0}
              count={product.rating?.count}
              size='small'
              showCount={true}
            />
          </Box>
        </Box>
      </CardContent>

      <Button fullWidth variant='contained' size='large' sx={styles.button}>
        View
      </Button>

      <DeleteButton
        open={isOpen}
        loading={loading}
        toggleOpen={toggleOpen}
        handleDelete={handleDelete}
        productTitle={product.title}
      />

      <Alerts {...alert} />
    </Card>
  );
};

export const ProductsCard = React.memo(ProductsCardComponent);
