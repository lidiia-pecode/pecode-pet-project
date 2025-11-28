'use client';
import { useRangeFilter } from '@/hooks/products/useRangeFilter';
import { useProductsStore } from '@/store/productsStore';
import { Box, Typography, Slider } from '@mui/material';

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
        <span>₴{localValue[0]}</span>
        <span>₴{localValue[1]}</span>
      </Box>

      <Box sx={{ px: 1 }}>
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
