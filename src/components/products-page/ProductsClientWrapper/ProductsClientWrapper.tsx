import { Box } from '@mui/material';
import { ProductsPagination } from '../ProductsPagination';
import { ProductsList } from '../ProductsList';
import { ProductsTopBar } from '../ProductsTopBar';
import { FiltersBlockWrapper } from '../FiltersBlock';
import { ProductClientWrapperStyles } from './ProductsClientWrapper.styles';
import { cookies } from 'next/headers';

export default async function ProductClientWrapper() {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('access_token')?.value;

  return (
    <>
      <ProductsTopBar />

      <Box sx={ProductClientWrapperStyles.main}>
        <FiltersBlockWrapper />

        <Box sx={ProductClientWrapperStyles.list}>
          <ProductsList authorized={!!accessToken} />

          <ProductsPagination />
        </Box>
      </Box>
    </>
  );
}
