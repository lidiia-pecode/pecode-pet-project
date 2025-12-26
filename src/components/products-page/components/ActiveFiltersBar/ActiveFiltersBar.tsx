'use client';

import { Box, Button, Chip } from '@mui/material';

import { styles } from './ActiveFiltersBar.styles';
import { getActiveFilters } from '@/lib/utils/getActiveFilters';
import { useProductsStore } from '@/store/productsStore';


export const ActiveFiltersBar = () => {
  const filters = useProductsStore(state => state.filters);
  const removeFilter = useProductsStore(state => state.removeFilter);
  const clearFilters = useProductsStore(state => state.clearFilters);
  const activeFilters = getActiveFilters(filters);

  if (!activeFilters.length) return null;

  return (
    <Box sx={styles.container}>
      <Button size='small' variant='outlined' onClick={clearFilters}>
        Clear All
      </Button>

      {activeFilters.map(filter => (
        <Chip
          color='primary'
          size='small'
          key={`${filter.type}-${filter.label}`}
          label={filter.label}
          onDelete={() => removeFilter(filter.type)}
        />
      ))}
    </Box>
  );
};
