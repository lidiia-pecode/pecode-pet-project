'use client';

import {
  Box,
  Typography,
  Slider,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Divider,
  Paper,
  Button,
} from '@mui/material';
import { ActiveFiltersBar } from '../filters/ActiveFiltersBar';
import { CATEGORIES, FilterKey, ProductFilters } from '@/types/Filters';
import { getActiveFilters } from '@/lib/utils/getActiveFilters';

interface ProductFiltersBlockProps {
  filters: ProductFilters;
  isMobile: boolean;
  onChange: (updated: Partial<ProductFiltersBlockProps['filters']>) => void;
  onClose: () => void;
  removeFilter: (type: FilterKey, value: unknown) => void;
  handleClearFilters: () => void;
}

export const ProductFiltersBlock = ({
  filters,
  isMobile,
  onChange,
  onClose,
  removeFilter,
  handleClearFilters,
}: ProductFiltersBlockProps) => {
  const isActiveFiltersBarShown = getActiveFilters(filters).length > 0;

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    const [min, max] = newValue as [number, number];
    onChange({ price: { min, max } });
  };

  const handleRatingChange = (_: Event, newValue: number | number[]) => {
    const [min, max] = newValue as [number, number];
    onChange({ rating: { min, max } });
  };

  const handleCategoryChange = (category: string) => {
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
          borderRadius: isMobile ? 0 : 3,
          boxShadow: isMobile ? 'none' : '',
          width: isMobile ? 300 : 260,
          p: isMobile ? 2 : 3,
          pt : 3,
          position : 'sticky',
          top: isMobile ? 0 : 80,
        }}
      >
        {isMobile && isActiveFiltersBarShown && (
          <>
            <ActiveFiltersBar
              filters={filters}
              removeFilter={removeFilter}
              handleClearFilters={handleClearFilters}
            />
            <Divider />
          </>
        )}

        <Box>
          <Typography variant='subtitle1' fontWeight={600} gutterBottom>
            Price
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 13,
              mb: 0.5,
              color: 'text.secondary',
            }}
          >
            <span>₴{filters.price.min}</span>
            <span>₴{filters.price.max}</span>
          </Box>

          <Box sx={{ px: 1 }}>
            <Slider
              value={[filters.price.min, filters.price.max]}
              onChange={handlePriceChange}
              valueLabelDisplay='auto'
              min={0}
              max={1000}
            />
          </Box>
        </Box>

        <Divider />

        <Box>
          <Typography variant='subtitle1' fontWeight={600} gutterBottom>
            Rating
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 13,
              mb: 0.5,
              color: 'text.secondary',
            }}
          >
            <span>{filters.rating.min}★</span>
            <span>{filters.rating.max}★</span>
          </Box>
          <Box sx={{ px: 1 }}>
            <Slider
              value={[filters.rating.min, filters.rating.max]}
              onChange={handleRatingChange}
              valueLabelDisplay='auto'
              min={0}
              max={5}
              step={0.1}
            />
          </Box>
        </Box>

        <Divider />

        <Box>
          <Typography variant='subtitle1' fontWeight={600} gutterBottom>
            Categories
          </Typography>

          <FormGroup>
            {CATEGORIES.map(category => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    size='small'
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                }
                label={category}
              />
            ))}
          </FormGroup>
        </Box>

        {isMobile && (
          <Button variant='outlined' onClick={onClose}>
            Close
          </Button>
        )}
      </Paper>
    </Box>
  );
};
