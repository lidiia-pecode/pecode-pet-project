'use client';

import { useProductsParams } from '@/hooks/useProductsParams';
import { getActiveFilters } from '@/lib/utils/getActiveFilters';
import { Box, Button, Chip } from '@mui/material';

export const ActiveFiltersBar = () => {
  const { filters, removeFilter, clearFilters } = useProductsParams();
  const activeFilters = getActiveFilters(filters);

  if (!activeFilters.length) return null;

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      <Button size='small' onClick={clearFilters}>
        Clear All
      </Button>

      {activeFilters.map(filter => (
        <Chip
          sx={{ color: 'text.secondary' }}
          key={`${filter.type}-${filter.label}`}
          label={filter.label}
          onDelete={() => removeFilter(filter.type)}
        />
      ))}
    </Box>
  );
};
