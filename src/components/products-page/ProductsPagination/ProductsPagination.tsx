'use client';

import { Stack, Pagination } from '@mui/material';
import React from 'react';

interface ProductsPaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export const ProductsPagination: React.FC<ProductsPaginationProps> = ({
  currentPage,
  totalPages,
  onChange,
}) => {
  return (
    <Stack spacing={2} alignItems='center' mt={4}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onChange(page)}
        color='primary'
      />
    </Stack>
  );
};
