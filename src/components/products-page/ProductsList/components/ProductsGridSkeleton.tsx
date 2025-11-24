'use client';

import { Box, Skeleton, Card, CardContent } from '@mui/material';
import { baseStyles } from '../../ProductsCard/ProductsCard.styles';

export const ProductsCardSkeleton = () => {
  return (
    <Card sx={baseStyles.cardGrid}>
      <Skeleton variant='rectangular' sx={baseStyles.imageGrid} />

      <CardContent sx={{ flexGrow: 1 }}>
        <Skeleton variant='text' width='80%' height={32} sx={{ mb: 1 }} />
        <Skeleton variant='text' width='100%' />
        <Skeleton variant='text' width='100%' />
        <Skeleton variant='text' width='60%' />

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Skeleton variant='text' width={60} height={28} />
          <Skeleton variant='text' width={100} height={20} sx={{ ml: 2 }} />
        </Box>
      </CardContent>

      <Skeleton
        variant='rectangular'
        width='100%'
        height={42}
        sx={{ borderRadius: 0 }}
      />
    </Card>
  );
};

export const ProductsGridSkeleton = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
        gap: 2,
      }}
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductsCardSkeleton key={index} />
      ))}
    </Box>
  );
};
