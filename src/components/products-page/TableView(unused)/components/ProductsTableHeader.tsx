'use client';
import { Box, Typography } from '@mui/material';
import { listTableStyles } from '../ProductsTableView.styles';
import { columns, gridTemplateColumns } from './columns';

export const ProductsTableHeader = () => {
  return (
    <Box sx={{ ...listTableStyles.header, gridTemplateColumns }}>
      {columns.map(col => (
        <Typography
          key={col.key}
          sx={{
            textAlign: col.align,
            fontWeight: 600,
            color: 'primary.main',
            ...(col.key === 'title' ? { ml: 8 } : {}),
          }}
          noWrap
        >
          {col.label}
        </Typography>
      ))}
    </Box>
  );
};
