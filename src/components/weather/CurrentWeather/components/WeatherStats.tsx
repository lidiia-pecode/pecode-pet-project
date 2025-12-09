import { ICurrentWeather } from '@/types/Weather';
import { Box, Typography } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';


export const WeatherStats = ({
  data,
  description,
}: {
  data: ICurrentWeather;
  description: string;
}) => {
  return (
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
        <Typography variant='body2'>{data.relative_humidity_2m}%</Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <AirIcon fontSize='small' />
        <Typography variant='body2'>{data.wind_speed_10m} m/s</Typography>
      </Box>
    </Box>
  );
};
