'use client';


import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import Image from 'next/image';

import { useCurrentWeatherQuery } from '@/hooks/weather/useCurrentWeather';
import { Paper, Typography, Box } from '@mui/material';
import { useWeatherStore } from '@/store/weatherStore';
import { getCurrentWeatherInfo } from '@/lib/utils/weather/getCurrentWeatherInfo';
import { useAutoLocation } from '@/hooks/weather/useAutoLocation';

import { DEFAULT_LOCATION } from '../constants';
import {
  formatCoordinates,
  getCompactLocation,
} from '@/lib/utils/weather/location';

import WeatherAdvice from './components/WeatherAdvice';
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

  if (isLoading || !data) return <div>Loading...</div>;

  const isDay = data.is_day;
  const { path, description } = getCurrentWeatherInfo(data.weather_code || 0);

  return (
    <Paper
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        position: 'relative',
        background: isDay ? '#ffffff' : '#0f1e40',
        color: isDay ? '#000' : '#fff',
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        mb: 3,
      }}
    >
      <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
        {isDay ? (
          <WbSunnyIcon fontSize='large' />
        ) : (
          <NightlightIcon fontSize='large' />
        )}
      </Box>

      <Typography
        variant='h5'
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          fontWeight: 600,
          maxWidth: 320
        }}
      >
        {locationTitle}
      </Typography>

      <Box sx={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
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
