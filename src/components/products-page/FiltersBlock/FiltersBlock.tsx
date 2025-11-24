'use client';
import { Box, Divider, Paper, Button, Drawer } from '@mui/material';
import { ActiveFiltersBar } from '../shared/ActiveFiltersBar';
import { PriceFilter } from './components/PriceFilter';
import { RatingFilter } from './components/RatingFilter';
import { CategoryFilter } from './components/CategoryFilter';
import { useProductsStore } from '@/store/productsStore';
import { paperStyles, containerStyles, filtersSidebarStyles } from './FiltersBlock.styles';

export const FiltersBlock = () => {
  const closeFilters = useProductsStore(state => state.closeFilters);

  return (
    <Box sx={containerStyles}>
      <Paper elevation={3} sx={paperStyles}>
        <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 3}}>
          <ActiveFiltersBar />
          <Divider />
        </Box>

        <PriceFilter />
        <Divider />
        <RatingFilter />
        <Divider />
        <CategoryFilter />

        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <Button
            variant='outlined'
            onClick={closeFilters}
            sx={{ xs: 'block', md: 'none' }}
          >
            Close
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export const FiltersBlockWrapper = () => {
  const filtersOpened = useProductsStore(state => state.filtersOpened);
  const closeFilters = useProductsStore(state => state.closeFilters);

  return (
    <>
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
