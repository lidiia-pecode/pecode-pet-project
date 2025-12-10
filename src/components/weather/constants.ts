export const COLORS = [
  '#ff69b4',
  '#ff0080',
  '#3b82f6',
  '#a855f7',
  '#ff6f61',
  '#26ced1',
  '#ffd500',
  '#ff6347',
  '#f754e3',
  '#c4ff00',
  '#ffa18d',
  '#f3ff50',
] as const;

export const getMetricColor = (metric: string, metrics: string[]) => {
  const idx = metrics.indexOf(metric);
  return COLORS[idx >= 0 ? idx % COLORS.length : 0];
};

export const MAP_CONFIG = {
  STYLE_URL:
    'https://api.maptiler.com/maps/base-v4/style.json?key=sdgjgQYux7lFdUtCFmcU',
  DEFAULT_CENTER: [50.45, 30.52] as [number, number],
  DEFAULT_ZOOM: 4,
  SELECTED_ZOOM: 6,
  SEARCH_DEBOUNCE: 300,
  SEARCH_LIMIT: 6,
} as const;


export const DEFAULT_LOCATION = {
  title: 'Kyiv, Ukraine',
  lat: 50.4501,
  lon: 30.5234,
};


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
  { label: 'UV Index', value: 'uv_index' },
  { label: 'Pressure (MSL)', value: 'pressure_msl' },
  { label: 'Cloud Cover', value: 'cloud_cover' },
  { label: 'Visibility', value: 'visibility' },
] as const;

export const DAILY_METRICS = [
  { label: 'Max Temperature', value: 'temperature_2m_max' },
  { label: 'Min Temperature', value: 'temperature_2m_min' },
  { label: 'Mean Temperature', value: 'temperature_2m_mean' },
  { label: 'Apparent Temp Max', value: 'apparent_temperature_max' },
  { label: 'Apparent Temp Min', value: 'apparent_temperature_min' },
  { label: 'Precipitation Sum', value: 'precipitation_sum' },
  { label: 'Rain Sum', value: 'rain_sum' },
  { label: 'Snowfall Sum', value: 'snowfall_sum' },
  {
    label: 'Precipitation Probability Max',
    value: 'precipitation_probability_max',
  },
  { label: 'Wind Speed Max', value: 'wind_speed_10m_max' },
  { label: 'Wind Gusts Max', value: 'wind_gusts_10m_max' },
  { label: 'Wind Direction Dominant', value: 'wind_direction_10m_dominant' },
  { label: 'Shortwave Radiation Sum', value: 'shortwave_radiation_sum' },
  { label: 'UV Index Max', value: 'uv_index_max' },
  { label: 'Sunrise', value: 'sunrise' },
  { label: 'Sunset', value: 'sunset' },
] as const;

export const METRICS = [...HOURLY_METRICS, ...DAILY_METRICS] as const;


