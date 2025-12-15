

import { Box } from '@mui/material';
import { ProductsPagination } from '../ProductsPagination';
import { ProductsList } from '../ProductsList';
import { ProductsTopBar } from '../ProductsTopBar';
import { FiltersBlockWrapper } from '../FiltersBlock';
import { ProductClientWrapperStyles } from './ProductsClientWrapper.styles';

export default function ProductClientWrapper() {
  return (
    <>
      <ProductsTopBar />

      <Box sx={ProductClientWrapperStyles.main}>
        <FiltersBlockWrapper />

        <Box sx={ProductClientWrapperStyles.list}>
          <ProductsList />

          <ProductsPagination />
        </Box>
      </Box>
    </>
  );
}
