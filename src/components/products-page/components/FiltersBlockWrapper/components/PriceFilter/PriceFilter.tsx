'use client';
import { Box, Typography, Slider } from '@mui/material';

import { styles } from './PriceFilter.styles';
import { useRangeFilter } from '@/hooks/products/useRangeFilter';
import { useProductsStore } from '@/store/productsStore';

export const PriceFilter = () => {
  const price = useProductsStore(state => state.filters.price);
  const updateFilters = useProductsStore(state => state.updateFilters);

  const commitPriceChange = (value: [number, number]) => {
    updateFilters({ price: { min: value[0], max: value[1] } });
  };

  const { localValue, handleChange, handleChangeCommitted } = useRangeFilter(
    [price.min, price.max],
    commitPriceChange
  );

  return (
    <Box>
      <Typography
        variant='subtitle1'
        sx={styles.title}
        gutterBottom
      >
        Price
      </Typography>

      <Box sx={styles.valueContainer}>
        <span>₴{localValue[0]}</span>
        <span>₴{localValue[1]}</span>
      </Box>

      <Box sx={styles.sliderContainer}>
        <Slider
          value={localValue}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
          valueLabelDisplay='auto'
          min={0}
          max={1000}
        />
      </Box>
    </Box>
  );
};
