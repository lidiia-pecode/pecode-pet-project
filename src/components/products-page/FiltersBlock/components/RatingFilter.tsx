'use client';
import { useRangeFilter } from '@/hooks/products/useRangeFilter';
import { useProductsStore } from '@/store/productsStore';
import { Box, Typography, Slider } from '@mui/material';
import { sliderFilterStyles } from '../FiltersBlock.styles';

export const RatingFilter = () => {
  const rating = useProductsStore(state => state.filters.rating);
  const updateFilters = useProductsStore(state => state.updateFilters);

  const commitPriceChange = (value: [number, number]) => {
    updateFilters({ rating: { min: value[0], max: value[1] } });
  };

  const { localValue, handleChange, handleChangeCommitted } = useRangeFilter(
    [rating.min, rating.max],
    commitPriceChange
  );

  return (
    <Box>
      <Typography variant='subtitle1' sx={sliderFilterStyles.title} gutterBottom>
        Rating
      </Typography>
      <Box
        sx={sliderFilterStyles.valueContainer}
      >
        <span>{rating.min}★</span>
        <span>{rating.max}★</span>
      </Box>
      <Box sx={sliderFilterStyles.sliderContainer}>
        <Slider
          value={localValue}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
          valueLabelDisplay='auto'
          min={0}
          max={5}
          step={0.1}
        />
      </Box>
    </Box>
  );
};
