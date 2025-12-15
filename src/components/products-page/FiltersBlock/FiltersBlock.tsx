'use client';
import { Box, Divider, Paper, Button, Drawer } from '@mui/material';
import { ActiveFiltersBar } from '../shared/ActiveFiltersBar';
import { PriceFilter } from './components/PriceFilter';
import { RatingFilter } from './components/RatingFilter';
import { CategoryFilter } from './components/CategoryFilter';
import { useProductsStore } from '@/store/productsStore';
import { filtersBlockStyles, filtersBlockWrapperStyles } from './FiltersBlock.styles';

export const FiltersBlock = () => {
  const closeFilters = useProductsStore(state => state.closeFilters);

  return (
    <Box sx={filtersBlockStyles.container}>
      <Paper elevation={3} sx={filtersBlockStyles.paper}>
        <Box sx={filtersBlockStyles.mobileTopBar}>
          <ActiveFiltersBar />
          <Divider />
        </Box>

        <PriceFilter />
        <Divider />
        <RatingFilter />
        <Divider />
        <CategoryFilter />

          <Button
            variant='outlined'
            onClick={closeFilters}
            sx={filtersBlockStyles.mobileCloseButton}
          >
            Close
          </Button>
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
        slotProps={{ paper: { sx: filtersBlockWrapperStyles.drawerPaper } }}
        sx={filtersBlockWrapperStyles.drawer}
      >
        <FiltersBlock />
      </Drawer>

      <Box sx={filtersBlockWrapperStyles.sidebar}>
        <FiltersBlock />
      </Box>
    </>
  );
};
