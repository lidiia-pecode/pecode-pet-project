'use client';
import { Box, Typography, Slider } from '@mui/material';
import { styles } from './RatingFilter.styles';

import { useRangeFilter } from '@/hooks/products/useRangeFilter';
import { useProductsStore } from '@/store/productsStore';


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
      <Typography variant='subtitle1' sx={styles.title} gutterBottom>
        Rating
      </Typography>
      <Box
        sx={styles.valueContainer}
      >
        <span>{rating.min}★</span>
        <span>{rating.max}★</span>
      </Box>
      <Box sx={styles.sliderContainer}>
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
