'use client';

import { Box, Typography } from '@mui/material';
import { emptyStateStyles } from '../ProductsGridView.styles';

export const EmptyState = () => {
  return (
    <Box sx={emptyStateStyles.container}>
      <Typography variant='h6' sx={emptyStateStyles.title}>
        No products found
      </Typography>
      
      <Typography variant='body2' sx={emptyStateStyles.subtitle}>
        Try adjusting your filters or search query
      </Typography>
    </Box>
  );
};
