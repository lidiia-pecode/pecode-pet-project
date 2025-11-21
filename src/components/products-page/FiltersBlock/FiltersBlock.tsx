'use client';
import { Box, Divider, Paper, Button } from '@mui/material';
import { ActiveFiltersBar } from '../shared/ActiveFiltersBar';
import { PriceFilter } from './components/PriceFilter';
import { RatingFilter } from './components/RatingFilter';
import { CategoryFilter } from './components/CategoryFilter';
import { getActiveFilters } from '@/lib/utils/getActiveFilters';
import { useResponsive } from '@/hooks/useResponsive';
import { useProductsStore } from '@/store/productsStore';

import { paperStyles, containerStyles } from './FiltersBlock.styles';
import { CategorySlug } from '@/types/Categories';

export const FiltersBlock = () => {
  const { isTablet } = useResponsive();
  const {filters, updateFilters, closeMobileFilters } = useProductsStore()

  const isActiveFiltersBarShown = getActiveFilters(filters).length > 0;

  const handlePriceChange = (min: number, max: number) => {
    updateFilters({ price: { min, max } });
  };

  const handleRatingChange = (min: number, max: number) => {
    updateFilters({ rating: { min, max } });
  };

  const handleCategoryChange = (category: CategorySlug) => {
    const isSelected = filters.categories.includes(category);
    const updated = isSelected
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    updateFilters({ categories: updated });
  };

  return (
    <Box sx={containerStyles}>
      <Paper
        elevation={3}
        sx={paperStyles(isTablet)}
      >
        {isTablet && isActiveFiltersBarShown && (
          <>
            <ActiveFiltersBar />
            <Divider />
          </>
        )}

        <PriceFilter
          min={filters.price.min}
          max={filters.price.max}
          onChange={handlePriceChange}
        />

        <Divider />

        <RatingFilter
          min={filters.rating.min}
          max={filters.rating.max}
          onChange={handleRatingChange}
        />

        <Divider />

        <CategoryFilter
          selected={filters.categories}
          onChange={handleCategoryChange}
        />

        {isTablet && (
          <Button variant='outlined' onClick={closeMobileFilters}>
            Close
          </Button>
        )}
      </Paper>
    </Box>
  );
};
