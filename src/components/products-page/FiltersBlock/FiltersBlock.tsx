'use client';
import { Box, Divider, Paper, Button } from '@mui/material';
import { ActiveFiltersBar } from '../shared/ActiveFiltersBar';
import { PriceFilter } from './components/PriceFilter';
import { RatingFilter } from './components/RatingFilter';
import { CategoryFilter } from './components/CategoryFilter';
import { useResponsive } from '@/hooks/useResponsive';
import { useProductsStore } from '@/store/productsStore';
import { paperStyles, containerStyles } from './FiltersBlock.styles';

export const FiltersBlock = () => {
  const { isTablet } = useResponsive();
  const closeMobileFilters = useProductsStore(
    state => state.closeMobileFilters
  );

  return (
    <Box sx={containerStyles}>
      <Paper elevation={3} sx={paperStyles(isTablet)}>
        {isTablet && (
          <>
            <ActiveFiltersBar />
            <Divider />
          </>
        )}

        <PriceFilter />
        <Divider />
        <RatingFilter />
        <Divider />
        <CategoryFilter />

        {isTablet && (
          <Button variant='outlined' onClick={closeMobileFilters}>
            Close
          </Button>
        )}
      </Paper>
    </Box>
  );
};
