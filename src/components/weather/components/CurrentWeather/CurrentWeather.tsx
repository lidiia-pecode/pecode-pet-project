'use client';

import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { Paper, Typography, Box } from '@mui/material';
import Image from 'next/image';

import { styles } from './CurrentWeather.styles';
import { DEFAULT_LOCATION } from '../../constants';
import { useWeatherStore } from '@/store/weatherStore';
import { useCurrentWeatherQuery } from '@/hooks/weather/useCurrentWeather';
import { useAutoLocation } from '@/hooks/weather/useAutoLocation';
import { getCurrentWeatherInfo } from '@/lib/utils/weather/getCurrentWeatherInfo';
import {
  formatCoordinates,
  getCompactLocation,
} from '@/lib/utils/weather/location';

import { WeatherAdvice } from './components/WeatherAdvice';
import { WeatherStats } from './components/WeatherStats';

export const CurrentWeather = () => {
  const { data, isLoading } = useCurrentWeatherQuery();
  const { autoLocation } = useAutoLocation();
  const selectedLocation = useWeatherStore(state => state.location);

  const locationTitle = selectedLocation
    ? getCompactLocation(selectedLocation.label || '') ||
      formatCoordinates(selectedLocation.lat, selectedLocation.lon)
    : autoLocation?.label
    ? getCompactLocation(autoLocation.label)
    : DEFAULT_LOCATION.title;

  if (isLoading || !data) return <Paper sx={styles.skeleton} />;

  const isDay = data.is_day;
  const { path, description } = getCurrentWeatherInfo(data.weather_code || 0);

  return (
    <Paper
      sx={{
        ...styles.rootBase,
        ...(isDay ? styles.day : styles.night),
      }}
    >
      <Box sx={styles.icon}>
        {isDay ? (
          <WbSunnyIcon fontSize='large' />
        ) : (
          <NightlightIcon fontSize='large' />
        )}
      </Box>

      <Typography variant='h5' sx={styles.title}>
        {locationTitle}
      </Typography>

      <Box sx={styles.content}>
        <Image
          src={path}
          alt={description}
          width={300}
          height={280}
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          priority
        />

        <WeatherStats data={data} description={description} />
      </Box>

      <WeatherAdvice />
    </Paper>
  );
};
