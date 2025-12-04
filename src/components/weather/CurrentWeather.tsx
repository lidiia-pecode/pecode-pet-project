'use client';

import { useCurrentWeatherQuery } from '@/hooks/weather/useCurrentWeather';
import { Paper, Typography, Box } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import Image from 'next/image';
import { DEFAULT_LOCATION } from './constants';
import { useWeatherStore } from '@/store/weatherStore';
import {
  formatCoordinates,
  getCompactLocation,
} from '@/lib/utils/weather/location';
import { getCurrentWeatherInfo } from '@/lib/utils/weather/getCurrentWeatherInfo';

export const CurrentWeather = () => {
  const { data, isLoading } = useCurrentWeatherQuery();
  const location = useWeatherStore(state => state.location);

  const locationTitle = location
    ? getCompactLocation(location.label || '') ||
      formatCoordinates(location.lat, location.lon)
    : DEFAULT_LOCATION.title;
  
  const isDay = data?.is_day;
  const { path, description } = getCurrentWeatherInfo(data?.weather_code || 0);

  if (isLoading || !data) return <div>Loading...</div>;

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
        sx={{ position: 'absolute', top: 16, left: 16, fontWeight: 600 }}
      >
        {locationTitle}
      </Typography>

      <Box sx={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
        <Image
          src={path}
          alt={description}
          width={400}
          height={280}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            p: 3,
            alignItems: 'flex-start',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ThermostatIcon sx={{ ml: '-10px' }} fontSize='large' />
            <Typography variant='h3'>{data.temperature_2m}°C</Typography>
          </Box>

          <Typography variant='h5'>{description}</Typography>

          <Typography variant='body2' sx={{ opacity: 0.8 }}>
            Feels like: {data.apparent_temperature}°C
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <OpacityIcon fontSize='small' />
            <Typography variant='body2'>
              {data.relative_humidity_2m}%
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AirIcon fontSize='small' />
            <Typography variant='body2'>{data.wind_speed_10m} m/s</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
