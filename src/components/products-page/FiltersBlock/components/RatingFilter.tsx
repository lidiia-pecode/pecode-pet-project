'use client';
import { Box, Typography, Slider } from '@mui/material';

interface RatingFilterProps {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
}

export const RatingFilter = ({ min, max, onChange }: RatingFilterProps) => {
  const handleChange = (_: Event, newValue: number | number[]) => {
    const [newMin, newMax] = newValue as [number, number];
    onChange(newMin, newMax);
  };

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
        <span>{min}★</span>
        <span>{max}★</span>
      </Box>
      <Box sx={{ px: 1 }}>
        <Slider
          value={[min, max]}
          onChange={handleChange}
          valueLabelDisplay='auto'
          min={0}
          max={5}
          step={0.1}
        />
      </Box>
    </Box>
  );
};
