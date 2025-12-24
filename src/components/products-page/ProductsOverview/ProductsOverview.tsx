import { Box } from '@mui/material';
import { ProductsPagination } from '../ProductsPagination';
import { ProductsList } from '../ProductsList';
import { ProductsTopBar } from '../ProductsTopBar';
import { FiltersBlockWrapper } from '../FiltersBlock';
import { styles } from './ProductsOverview.styles';

export default async function ProductsOverview() {
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
