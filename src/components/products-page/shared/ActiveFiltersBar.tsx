'use client';

import { getActiveFilters } from '@/lib/utils/getActiveFilters';
import { useProductsStore } from '@/store/productsStore';
import { Box, Button, Chip } from '@mui/material';

export const ActiveFiltersBar = () => {
  const { filters, removeFilter, clearFilters } = useProductsStore();
  const activeFilters = getActiveFilters(filters);

  if (!activeFilters.length) return null;

  return (
    <Box sx={{ display: 'flex', alignContent: 'center', flexWrap: 'wrap', gap: 1 }}>
      <Button size='small' variant='outlined' onClick={clearFilters}>
        Clear All
      </Button>

      {activeFilters.map(filter => (
        <Chip
          color='primary'
          key={`${filter.type}-${filter.label}`}
          label={filter.label}
          onDelete={() => removeFilter(filter.type)}
        />
      ))}
    </Box>
  );
};
