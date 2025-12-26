'use client';
import { Box, Divider, Paper, Button } from '@mui/material';

import { styles } from './FiltersBlock.styles';
import { useProductsStore } from '@/store/productsStore';
import { ActiveFiltersBar } from '../../../ActiveFiltersBar';
import { PriceFilter } from '../PriceFilter';
import { RatingFilter } from '../RatingFilter';
import { CategoryFilter } from '../CategoryFilter';

export const FiltersBlock = () => {
  const closeFilters = useProductsStore(state => state.closeFilters);

  return (
    <Box sx={styles.container}>
      <Paper elevation={3} sx={styles.paper}>
        <Box sx={styles.mobileTopBar}>
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
          sx={styles.mobileCloseButton}
        >
          Close
        </Button>
      </Paper>
    </Box>
  );
};
