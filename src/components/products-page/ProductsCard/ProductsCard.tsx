'use client';

import React from 'react';
import { Card, CardContent, Box, Typography, Button } from '@mui/material';
import type { Product } from '@/types/Product';
import { ProductRating } from '../shared/ProductRating';
import { useRouter } from 'next/navigation';
import { cardStyles } from './ProductsCard.styles';
import { DeleteProductButton } from './components/DeleteButton';
import { useProducts } from '@/hooks/products/useProducts';

interface ProductsCardProps {
  product: Product;
  authorized: boolean;
}
const ProductsCardComponent = ({ product, authorized }: ProductsCardProps) => {
  const image = product.images?.[0] ?? '/placeholder.png';

  const router = useRouter();
  const handleOpenProduct = () => {
    router.push(`/products/${product.id}`);
  };

  const refetch = useProducts().refetch;

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

      {authorized && <DeleteProductButton id={product.id} refetch={refetch} />}
    </Card>
  );
};

export const ProductsCard = React.memo(ProductsCardComponent);
