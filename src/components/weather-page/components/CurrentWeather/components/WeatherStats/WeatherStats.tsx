import { Box, Typography } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';

import { styles } from './WeatherStats.styles';
import { ICurrentWeather } from '@/types/Weather';

export const WeatherStats = ({
  data,
  description,
}: {
  data: ICurrentWeather;
  description: string;
}) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.tempRow}>
        <ThermostatIcon sx={styles.tempIcon} fontSize='large' />
        <Typography variant='h3'>{data.temperature_2m}°C</Typography>
      </Box>

      <Typography variant='h5'>{description}</Typography>

      <Typography variant='body2' sx={styles.feelsLike}>
        Feels like: {data.apparent_temperature}°C
      </Typography>

      <Box sx={styles.statRow}>
        <OpacityIcon fontSize='small' />
        <Typography variant='body2'>{data.relative_humidity_2m}%</Typography>
      </Box>

      <Box sx={styles.statRow}>
        <AirIcon fontSize='small' />
        <Typography variant='body2'>{data.wind_speed_10m} m/s</Typography>
      </Box>
    </Box>
  );
};
