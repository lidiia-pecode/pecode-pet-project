'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  useMediaQuery,
  useTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { ProductList } from '@/components/products';
import { ActiveFiltersBar } from '@/components/filters/ActiveFiltersBar';
import { ProductFiltersBlock } from '@/components/products/ProductFiltersBlock';
import { useProductFilters } from '@/hooks/useProductFilters';

export default function ProductPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { filters, handleFilterChange, handleClearFilters, removeFilter } =
    useProductFilters();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [sort, setSort] = useState('ratingDesc');

  const toggleMobileFilters = () => setMobileOpen(prev => !prev);

  const handleSortChange = (e: SelectChangeEvent) => {
    setSort(e.target.value);
  };

  const filtersBlock = (
    <ProductFiltersBlock
      filters={filters}
      isMobile={isMobile}
      onChange={handleFilterChange}
      onClose={toggleMobileFilters}
      removeFilter={removeFilter}
      handleClearFilters={handleClearFilters}
    />
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          minHeight: 64,
        }}
      >
        <Box sx={{ flex: 1, mr: 2 }}>
          {isMobile ? (
            <Button variant='outlined' onClick={toggleMobileFilters}>
              Filters
            </Button>
          ) : (
            <ActiveFiltersBar
              filters={filters}
              removeFilter={removeFilter}
              handleClearFilters={handleClearFilters}
            />
          )}
        </Box>

        <FormControl size='small' sx={{ minWidth: 200 }}>
          <InputLabel id='sort-label'>Sort by</InputLabel>
          <Select
            labelId='sort-label'
            value={sort}
            label='Sort by'
            onChange={handleSortChange}
          >
            <MenuItem value='ratingDesc'>Highest rated</MenuItem>
            <MenuItem value='priceAsc'>Price: Low to High</MenuItem>
            <MenuItem value='priceDesc'>Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, p: 2 }}>
        {isMobile ? (
          <Drawer
            open={mobileOpen}
            onClose={toggleMobileFilters}
            anchor='left'
            slotProps={{
              paper: {
                sx: { width: 300 },
              },
            }}
          >
            {filtersBlock}
          </Drawer>
        ) : (
          <Box sx={{ width: 260, flexShrink: 0 }}>{filtersBlock}</Box>
        )}

        <Box sx={{ flexGrow: 1 }}>
          <ProductList />
        </Box>
      </Box>
    </>
  );
}
