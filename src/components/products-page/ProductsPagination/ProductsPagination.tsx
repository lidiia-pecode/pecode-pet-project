'use client';

import { useProducts } from '@/hooks/products/useProducts';
import { useProductsStore } from '@/store/productsStore';
import { Theme } from '@emotion/react';
import { Stack, Pagination, SxProps } from '@mui/material';

const productsPaginationStyles = {
  stack: {
    mt: 4,
    alignItems: 'center',
  },
} satisfies Record<string, SxProps<Theme>>;

export const ProductsPagination = () => {
  const { data } = useProducts();
  const totalPages = data?.totalPages;

  const currentPage = useProductsStore(state => state.currentPage);
  const setPage = useProductsStore(state => state.setPage);

  if (!totalPages) {
    return null;
  }

  return (
    <Stack spacing={2} sx={productsPaginationStyles.stack}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => setPage(page)}
        color='primary'
      />
    </Stack>
  );
};
