'use client';
import { Box, Divider, Paper, Button, Drawer } from '@mui/material';
import { ActiveFiltersBar } from '../shared/ActiveFiltersBar';
import { PriceFilter } from './components/PriceFilter';
import { RatingFilter } from './components/RatingFilter';
import { CategoryFilter } from './components/CategoryFilter';
import { useResponsive } from '@/hooks/useResponsive';
import { useProductsStore } from '@/store/productsStore';
import { paperStyles, containerStyles, filtersSidebarStyles } from './FiltersBlock.styles';

export const FiltersBlock = () => {
  const { isTablet } = useResponsive();
  const closeFilters = useProductsStore(state => state.closeFilters);

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
          <Button variant='outlined' onClick={closeFilters} sx={{xs: 'block', md: 'none'}}>
            Close
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export const FiltersBlockWrapper = () => {
  const filtersOpened = useProductsStore(state => state.filtersOpened);
  const closeFilters = useProductsStore(state => state.closeFilters);

  return (
    <>
      {/* Drawer для мобільних/планшетів */}
      <Drawer
        open={filtersOpened}
        onClose={closeFilters}
        anchor='left'
        slotProps={{ paper: { sx: { p: 2 } } }}
        sx={{ 
          display: { xs: 'block', md: 'none' } 
        }}
      >
        <FiltersBlock />
      </Drawer>

      {/* Sidebar для desktop */}
      <Box 
        sx={{
          ...filtersSidebarStyles,
          display: { xs: 'none', md: 'block' }
        }}
      >
        <FiltersBlock />
      </Box>
    </>
  );
};
