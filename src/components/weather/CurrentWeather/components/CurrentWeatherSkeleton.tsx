import { Paper } from '@mui/material';
import { currentWeatherSkeletonStyles } from '../CurrentWeather.styles';

export const CurrentWeatherSkeleton = () => (
  <Paper sx={currentWeatherSkeletonStyles.container} />
);
