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

interface ProductBreadcrumbsProps {
  productTitle: string;
  sx?: SxProps<Theme>;
}

export const ProductBreadcrumbs = ({
  productTitle,
  sx,
}: ProductBreadcrumbsProps) => {
  return (
    <Box sx={{ overflow: 'hidden', ...sx }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize='small' />}
        sx={{
          fontSize: 14,
          '& .MuiBreadcrumbs-ol': {
            flexWrap: 'nowrap',
          },
          '& .MuiBreadcrumbs-li:not(:last-of-type)': {
            flexShrink: 0,
          },
          '& .MuiBreadcrumbs-separator': {
            flexShrink: 0,
          },
          '& .MuiBreadcrumbs-li:last-of-type': {
            minWidth: 0,
            overflow: 'hidden',
          },
        }}
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
          sx={{ fontSize: 14 }}
          title={productTitle}
          noWrap
        >
          {productTitle}
        </Typography>
      </Breadcrumbs>
    </Box>
  );
};
