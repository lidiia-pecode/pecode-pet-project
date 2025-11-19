'use client';
import { Box, Divider, Paper, Button } from '@mui/material';
import { ActiveFiltersBar } from '../shared/ActiveFiltersBar';
import { PriceFilter } from './components/PriceFilter';
import { RatingFilter } from './components/RatingFilter';
import { CategoryFilter } from './components/CategoryFilter';
import { CategorySlug } from '@/types/Filters';
import { getActiveFilters } from '@/lib/utils/getActiveFilters';
import { useResponsive } from '@/hooks/useResponsive';
import { useProductsStore } from '@/store/productsStore';
import { useProductsParams } from '@/hooks/useProductsParams';

export const FiltersBlock = () => {
  const { isTablet } = useResponsive();
  const { filters, updateFilters } = useProductsParams();
  const { closeMobileFilters } = useProductsStore()

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
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          flexShrink: 0,
          height: 'fit-content',
          borderRadius: isTablet ? 0 : 3,
          boxShadow: isTablet ? 'none' : '',
          width: isTablet ? 300 : 260,
          p: isTablet ? 2 : 3,
          pt: 3,
          position: 'sticky',
          top: isTablet ? 0 : 80,
        }}
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
