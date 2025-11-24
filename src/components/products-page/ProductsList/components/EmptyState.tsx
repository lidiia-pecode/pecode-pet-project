'use client';

import { Box, Typography } from '@mui/material';
import { emptyBox } from '../ProductsList.styles';

export const EmptyState = () => {
  return (
    <Box
      sx={emptyBox}
    >
      <Typography variant='h6' color='text.secondary'>
        No products found
      </Typography>
      <Typography variant='body2' color='text.disabled'>
        Try adjusting your filters or search query
      </Typography>
    </Box>
  );
};
