'use client';

import { Box, Typography, Skeleton } from '@mui/material';
import { listTableStyles } from '../../ProductsListTable/ProductsListTable.styles';

const skeletonColumns = [
  { width: 'minmax(80px, 80px)', align: 'center' },
  { width: 'minmax(160px, 1fr)', align: 'left' },
  { width: 'minmax(70px, 120px)', align: 'center' },
  { width: 'minmax(140px, 180px)', align: 'center' },
  { width: 'minmax(80px, 120px)', align: 'center' },
];

export const ProductsListTableSkeleton = () => {
  const gridTemplateColumns = skeletonColumns.map(c => c.width).join(' ');

  return (
    <Box>
      {/* Header */}
      <Box sx={{ ...listTableStyles.header, gridTemplateColumns }}>
        {skeletonColumns.map((col, i) => (
          <Typography
            key={i}
            sx={{ textAlign: col.align, fontWeight: 600 }}
            noWrap
          >
            <Skeleton width={60} height={22} />
          </Typography>
        ))}
      </Box>

      {/* Rows */}
      {Array.from({ length: 6 }).map((_, rowIndex) => (
        <Box
          key={rowIndex}
          sx={{ ...listTableStyles.row, gridTemplateColumns }}
        >
          {/* Image */}
          <Box sx={{ textAlign: 'center' }}>
            <Skeleton
              variant='rectangular'
              width={60}
              height={60}
              sx={{ borderRadius: 1 }}
            />
          </Box>

          {/* Title */}
          <Box sx={{ textAlign: 'left' }}>
            <Skeleton width='80%' height={20} />
          </Box>

          {/* Price */}
          <Box sx={{ textAlign: 'center' }}>
            <Skeleton width={40} height={20} />
          </Box>

          {/* Rating */}
          <Box sx={{ textAlign: 'center' }}>
            <Skeleton width={100} height={20} />
          </Box>

          {/* Button */}
          <Box sx={{ textAlign: 'center' }}>
            <Skeleton
              variant='rectangular'
              width={70}
              height={32}
              sx={{ borderRadius: 1 }}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};
