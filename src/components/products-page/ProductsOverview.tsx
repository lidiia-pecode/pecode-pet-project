import { Box } from '@mui/material';

import { styles } from './ProductsOverview.styles';
import { ProductsPagination } from './components/ProductsPagination';
import { ProductsList } from './components/ProductsList';
import { ProductsTopBar } from './components/ProductsTopBar';
import { FiltersBlockWrapper } from './components/FiltersBlockWrapper';

export const ProductsOverview = () => {
  return (
    <>
      <ProductsTopBar />

      <Box sx={styles.main}>
        <FiltersBlockWrapper />

        <Box sx={styles.list}>
          <ProductsList />

          <ProductsPagination />
        </Box>
      </Box>
    </>
  );
}
