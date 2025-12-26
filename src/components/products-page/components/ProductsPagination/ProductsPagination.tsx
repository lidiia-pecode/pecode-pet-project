'use client';

import { Stack, Pagination } from '@mui/material';

import { styles } from './ProductsPagination.styles';
import { useProducts } from '@/hooks/products/useProducts';
import { useProductsStore } from '@/store/productsStore';



export const ProductsPagination = () => {
  const { data } = useProducts();
  const totalPages = data?.totalPages;

  const currentPage = useProductsStore(state => state.currentPage);
  const setPage = useProductsStore(state => state.setPage);

  if (!totalPages) {
    return null;
  }

  return (
    <Stack spacing={2} sx={styles.stack}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => setPage(page)}
        color='primary'
        sx={styles.pagination}
      />
    </Stack>
  );
};
