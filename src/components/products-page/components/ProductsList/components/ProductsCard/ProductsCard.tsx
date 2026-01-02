'use client';

import React from 'react';
import { Card, CardContent, Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

import { styles } from './ProductsCard.styles';
import type { Product } from '@/types/Product';
import { useDeleteProduct } from '@/hooks/products/useProducts';
import { DeleteButton } from '@/components/shared/DeleteButton';
import { ProductRating } from '@/components/shared/ProductRating';
import { AddToCartButton } from '@/components/shared/AddToCartButton';

interface ProductsCardProps {
  product: Product;
}
const ProductsCardComponent = ({ product }: ProductsCardProps) => {
  const image = product.images?.[0] ?? '/placeholder.png';

  const router = useRouter();
  const handleOpenProduct = () => {
    router.push(`/products/${product.id}`);
  };
  const deleteMutation = useDeleteProduct();

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
        entityName={product.title}
        entityType='product'
        loading={deleteMutation.isPending}
        onConfirm={async () => {
          await deleteMutation.mutateAsync(product.id);
        }}
      />

      <Box sx={styles.addToCartWrapper}>
        <AddToCartButton variant='icon' product={{ ...product, quantity: 1 }} />
      </Box>
    </Card>
  );
};

export const ProductsCard = React.memo(ProductsCardComponent);
