import {
  mainContentStyles,
  productsContainerStyles,
} from './ProductsClientWrapper.styles';

import { Box } from '@mui/material';
import { ProductsPagination } from '../ProductsPagination';
import { ProductsList } from '../ProductsList';
import { ProductsTopBar } from '../ProductsTopBar';
import { FiltersBlockWrapper } from '../FiltersBlock';

export default function ProductClientWrapper() {
  return (
    <>
      <ProductsTopBar />

      <Box sx={mainContentStyles}>
        <FiltersBlockWrapper />

        <Box sx={productsContainerStyles}>
          <ProductsList />

          <ProductsPagination />
        </Box>
      </Box>
    </>
  );
}
