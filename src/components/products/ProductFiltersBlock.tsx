'use client';
import { Box, Divider, Paper, Button } from '@mui/material';
import { ActiveFiltersBar } from './filters/ActiveFiltersBar';
import { PriceFilter } from './filters/PriceFilter';
import { RatingFilter } from './filters/RatingFilter';
import { CategoryFilter } from './filters/CategoryFilter';
import { Category, FilterKey, ProductFilters } from '@/types/Filters';
import { getActiveFilters } from '@/lib/utils/getActiveFilters';

interface ProductFiltersBlockProps {
  filters: ProductFilters;
  isTablet: boolean;
  onChange: (updated: Partial<ProductFilters>) => void;
  onClose: () => void;
  removeFilter: (type: FilterKey, value?: Category) => void;
  handleClearFilters: () => void;
}

export const ProductFiltersBlock = ({
  filters,
  isTablet,
  onChange,
  onClose,
  removeFilter,
  handleClearFilters,
}: ProductFiltersBlockProps) => {
  const isActiveFiltersBarShown = getActiveFilters(filters).length > 0;

  const handlePriceChange = (min: number, max: number) => {
    onChange({ price: { min, max } });
  };

  const handleRatingChange = (min: number, max: number) => {
    onChange({ rating: { min, max } });
  };

  const handleCategoryChange = (category: Category) => {
    const isSelected = filters.categories.includes(category);
    const updated = isSelected
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onChange({ categories: updated });
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
            <ActiveFiltersBar
              filters={filters}
              removeFilter={removeFilter}
              handleClearFilters={handleClearFilters}
            />
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
          <Button variant='outlined' onClick={onClose}>
            Close
          </Button>
        )}
      </Paper>
    </Box>
  );
};
