import { Paper } from '@mui/material';

export const CurrentWeatherSkeleton = () => (
  <Paper
    sx={{
      width: '100%',
      height: 280,
      borderRadius: 3,
      p: 3,
      mb: 3,
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #ffffff 0%, #6c81ce 100%)',
    }}
  />
);
