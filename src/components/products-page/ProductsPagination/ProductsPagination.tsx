'use client';

import { useProducts } from '@/hooks/useProducts';
import { useProductsStore } from '@/store/productsStore';
import { Stack, Pagination } from '@mui/material';

export const ProductsPagination = () => {
  const { data } = useProducts();
  const totalPages = data?.totalPages;

  const currentPage = useProductsStore(state => state.currentPage);
  const setPage = useProductsStore(state => state.setPage);

  if (!totalPages) {
    return null;
  }

  return (
    <Stack spacing={2} alignItems='center' mt={4}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => setPage(page)}
        color='primary'
      />
    </Stack>
  );
};
