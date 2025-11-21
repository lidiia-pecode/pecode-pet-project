'use client';
import { useRangeFilter } from '@/hooks/useRangeFilter';
import { useProductsStore } from '@/store/productsStore';
import { Box, Typography, Slider } from '@mui/material';

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
        <span>{rating.min}★</span>
        <span>{rating.max}★</span>
      </Box>
      <Box sx={{ px: 1 }}>
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
