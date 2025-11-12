'use client';

import { Box, Button, Chip } from '@mui/material';
import { FilterKey, ProductFilters } from '@/types/Filters';
import { getActiveFilters } from '@/lib/utils/getActiveFilters';

interface ActiveFiltersBarProps {
  filters: ProductFilters;
  removeFilter: (type: FilterKey, value: unknown) => void;
  handleClearFilters: () => void;
}

export const ActiveFiltersBar = ({
  filters,
  removeFilter,
  handleClearFilters,
}: ActiveFiltersBarProps) => {
  const activeFilters = getActiveFilters(filters);

  if (!activeFilters.length) return null;

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      <Button size='small' onClick={handleClearFilters}>
        Clear All
      </Button>

      {activeFilters.map(filter => (
        <Chip
          sx={{ color: 'text.secondary' }}
          key={`${filter.type}-${filter.label}`}
          label={filter.label}
          onDelete={() => removeFilter(filter.type, filter.value)}
        />
      ))}
    </Box>
  );
};
