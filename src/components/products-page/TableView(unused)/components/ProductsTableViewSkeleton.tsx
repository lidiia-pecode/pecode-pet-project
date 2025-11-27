'use client';
import { Box, Skeleton } from '@mui/material';
import { listTableStyles } from '../ProductsTableView.styles';
import { columns, gridTemplateColumns } from './columns';
import { ProductsTableHeader } from './ProductsTableHeader';

export const ProductsTableViewSkeleton = () => {
  return (
    <Box>
      <ProductsTableHeader />

      {Array.from({ length: 6 }).map((_, i) => (
        <Box
          key={i}
          sx={{
            ...listTableStyles.row,
            gridTemplateColumns,
            alignItems: 'center',
            height: 88,
          }}
        >
          {columns.map((col, index) => (
            <Box
              key={index}
              sx={{
                justifySelf: col.align,
                display: 'flex',
              }}
            >
              {col.key === 'image' && (
                <Skeleton variant='rectangular' width={80} height={80} />
              )}

              {col.key === 'title' && <Skeleton width={120} sx={{ ml: 1.5 }} />}

              {col.key === 'price' && <Skeleton width={40} />}

              {col.key === 'rating' && <Skeleton width={100} />}

              {col.key === 'action' && (
                <Skeleton variant='rectangular' width={70} height={32} />
              )}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};
