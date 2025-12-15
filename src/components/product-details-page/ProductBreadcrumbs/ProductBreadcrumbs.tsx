'use client';

import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  SxProps,
  Theme,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NextLink from 'next/link';
import { productBreadcrumbsStyles } from './productBreadcrumbs.styles';

interface ProductBreadcrumbsProps {
  productTitle: string;
  sx?: SxProps<Theme>;
}

export const ProductBreadcrumbs = ({
  productTitle,
  sx,
}: ProductBreadcrumbsProps) => {
  return (
    <Box sx={{ ...productBreadcrumbsStyles.container, ...sx }}>
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
