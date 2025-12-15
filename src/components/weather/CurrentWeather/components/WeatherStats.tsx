import { ICurrentWeather } from '@/types/Weather';
import { Box, Typography } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import { weatherStatsStyles } from '../CurrentWeather.styles';



export const WeatherStats = ({
  data,
  description,
}: {
  data: ICurrentWeather;
  description: string;
}) => {
  return (
    <Box sx={weatherStatsStyles.container}>
      <Box sx={weatherStatsStyles.tempRow}>
        <ThermostatIcon sx={weatherStatsStyles.tempIcon} fontSize='large' />
        <Typography variant='h3'>{data.temperature_2m}°C</Typography>
      </Box>

      <Typography variant='h5'>{description}</Typography>

      <Typography variant='body2' sx={weatherStatsStyles.feelsLike}>
        Feels like: {data.apparent_temperature}°C
      </Typography>

      <Box sx={weatherStatsStyles.statRow}>
        <OpacityIcon fontSize='small' />
        <Typography variant='body2'>{data.relative_humidity_2m}%</Typography>
      </Box>

      <Box sx={weatherStatsStyles.statRow}>
        <AirIcon fontSize='small' />
        <Typography variant='body2'>{data.wind_speed_10m} m/s</Typography>
      </Box>
    </Box>
  );
};
