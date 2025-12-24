'use client';

import React, { useState } from 'react';
import { Card, CardContent, Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

import { cardStyles } from './ProductsCard.styles';
import type { Product } from '@/types/Product';
import { deleteProductById } from '@/lib';

import { ProductRating } from '../shared/ProductRating';
import { DeleteButton } from '@/components/shared/DeleteButton';
import { Alerts } from '@/components/shared/Alerts';

import { useProducts } from '@/hooks/products/useProducts';
import { useAlert } from '@/hooks/useAlert';



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
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteProductById(product.id);
      alert.success('Product deleted!');
      refetch();
      setOpen(false);
    } catch (err) {
      alert.error('Failed to delete product');
      console.log(err);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={cardStyles.cardGrid}
      onClick={handleOpenProduct}
      role='button'
      tabIndex={0}
    >
      <Box
        component='img'
        src={image}
        alt={product.title}
        sx={cardStyles.imageGrid}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant='h6' sx={cardStyles.title}>
          {product.title}
        </Typography>

        <Typography sx={cardStyles.description}>
          {product.description}
        </Typography>

        <Box sx={cardStyles.priceRow}>
          <Typography sx={cardStyles.price}>${product.price}</Typography>

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

      <Button
        fullWidth
        variant='contained'
        size='large'
        sx={{ borderRadius: 0 }}
      >
        View
      </Button>

      <DeleteButton
        open={open}
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
