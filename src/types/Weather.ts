export const HOURLY_METRICS = [
  { label: 'Temperature', value: 'temperature_2m' },
  { label: 'Relative Humidity', value: 'relative_humidity_2m' },
  { label: 'Dewpoint', value: 'dewpoint_2m' },
  { label: 'Apparent Temperature', value: 'apparent_temperature' },
  { label: 'Precipitation Probability', value: 'precipitation_probability' },
  { label: 'Precipitation', value: 'precipitation' },
  { label: 'Rain', value: 'rain' },
  { label: 'Snowfall', value: 'snowfall' },
  { label: 'Wind Speed', value: 'wind_speed_10m' },
  { label: 'Wind Direction', value: 'wind_direction_10m' },
  { label: 'Soil Temperature', value: 'soil_temperature_0cm' },
  { label: 'Soil Moisture', value: 'soil_moisture_0_1cm' },
] as const;

export type HourlyMetric = (typeof HOURLY_METRICS)[number]['value'];
