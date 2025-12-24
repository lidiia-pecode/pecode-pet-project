'use client';

import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NextLink from 'next/link';
import { productBreadcrumbsStyles } from './productBreadcrumbs.styles';

interface ProductBreadcrumbsProps {
  productTitle: string;
}

export const ProductBreadcrumbs = ({
  productTitle,
}: ProductBreadcrumbsProps) => {
  return (
    <Box sx={productBreadcrumbsStyles.container}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize='small' />}
        sx={productBreadcrumbsStyles.breadcrumbs}
      >
        <Link
          component={NextLink}
          href='/'
          underline='hover'
          color='text.secondary'
        >
          Home
        </Link>

        <Link
          component={NextLink}
          href='/products'
          underline='hover'
          color='text.secondary'
        >
          Products
        </Link>

        <Typography
          color='text.secondary'
          sx={productBreadcrumbsStyles.lastItem}
          title={productTitle}
          noWrap
        >
          {productTitle}
        </Typography>
      </Breadcrumbs>
    </Box>
  );
};
