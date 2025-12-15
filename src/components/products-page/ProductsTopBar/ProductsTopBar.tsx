'use client';

import { Box, Button } from '@mui/material';
import { ActiveFiltersBar } from '../shared/ActiveFiltersBar';
import { SearchBar } from './components/SearchBar';
import { SortSelect } from './components/SortSelect';
import { ViewModeSwitcher } from './components/ViewModeSwitcher';
import { useProductsStore } from '@/store/productsStore';
import { AddProductButton } from './components/AddProductButton';
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
          <Button variant='outlined' onClick={openFilters} sx={topBarStyles.filtersButton}>
            Filters
          </Button>
          <AddProductButton />

          <Box sx={topBarStyles.activeFiltersBarContainer}>
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
