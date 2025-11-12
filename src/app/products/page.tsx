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
  Pagination,
} from '@mui/material';
import { ProductList } from '@/components/products';
import { ActiveFiltersBar } from '@/components/filters/ActiveFiltersBar';
import { ProductFiltersBlock } from '@/components/products/ProductFiltersBlock';
import { useProductFilters } from '@/hooks/useProductFilters';
import { useProducts } from '@/hooks/useProducts';
import { PRODUCTS_PER_PAGE } from '@/lib/constants';

export default function ProductPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [page, setPage] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sort, setSort] = useState('ratingDesc');

  const { filters, handleFilterChange, handleClearFilters, removeFilter } =
    useProductFilters();

  const { data, isLoading, isError } = useProducts(page, PRODUCTS_PER_PAGE);

  const toggleMobileFilters = () => setMobileOpen(prev => !prev);
  const handleSortChange = (e: SelectChangeEvent) => setSort(e.target.value);

  const products = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

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
            slotProps={{ paper: { sx: { width: 300 } } }}
          >
            {filtersBlock}
          </Drawer>
        ) : (
          <Box sx={{ width: 260, flexShrink: 0 }}>{filtersBlock}</Box>
        )}

        <Box sx={{ flexGrow: 1 }}>
          <ProductList
            products={products}
            isLoading={isLoading}
            isError={isError}
          />
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color='primary'
            shape='rounded'
            sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
          />
        </Box>
      </Box>
    </>
  );
}

