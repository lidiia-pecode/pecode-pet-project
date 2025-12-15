'use client';

import { Box, Skeleton, Card, CardContent } from '@mui/material';
import { productsGridSkeletonStyles } from '../ProductsGridView.styles';

export const ProductsGridSkeleton = () => (
  <Box sx={productsGridSkeletonStyles.cardsContainer}>
    {Array.from({ length: 8 }).map((_, i) => (
      <Card key={i} sx={productsGridSkeletonStyles.card}>
        <Skeleton variant='rectangular' height={180} />

        <CardContent sx={{ flexGrow: 1 }}>
          <Skeleton variant='text' width='80%' height={28} />
          <Skeleton variant='text' width='100%' />
          <Skeleton variant='text' width='100%' />
          <Skeleton variant='text' width='70%' />

          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 1 }}>
            <Skeleton variant='text' width={60} height={24} />
            <Skeleton variant='text' width={100} height={20} />
          </Box>
        </CardContent>

        <Skeleton variant='rectangular' height={42} />
      </Card>
    ))}
  </Box>
);
