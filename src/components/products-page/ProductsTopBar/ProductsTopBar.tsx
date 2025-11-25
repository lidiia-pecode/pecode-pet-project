'use client'

import { Box, Button } from '@mui/material';
import { ActiveFiltersBar } from '../shared/ActiveFiltersBar';
import { SearchBar } from './components/SearchBar';
import { SortSelect } from './components/SortSelect';
import { ViewModeSwitcher } from './components/ViewModeSwitcher';
import { useProductsStore } from '@/store/productsStore';
import { topBarStyles } from './ProductsTopBar.styles';

export const ProductsTopBar = () => {
  const openFilters = useProductsStore(state => state.openFilters);

  return (
    <>
      <Box sx={topBarStyles.searchBarContainer}>
        <SearchBar />
        <SortSelect />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Box sx={topBarStyles.filtersBarInner}>
          <Button
            variant='outlined'
            onClick={openFilters}
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
          >
            Filters
          </Button>

          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <ActiveFiltersBar />
          </Box>

          <Box sx={topBarStyles.viewModeSwitcherContainer}>
            <ViewModeSwitcher />
          </Box>
        </Box>
      </Box>
    </>
  );
};
