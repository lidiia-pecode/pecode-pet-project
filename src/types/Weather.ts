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

export type MetricItem = (typeof METRICS)[number];
export type WeatherMetric = MetricItem['value'];

export const METRIC_TABS = [
  { id: 'hourly', label: 'Hourly' },
  { id: 'daily', label: 'Daily' },
] as const;

export type TMetricTab = (typeof METRIC_TABS)[number]['id'];

export const weatherMetricLabels: Record<WeatherMetric, string> =
  Object.fromEntries(METRICS.map(m => [m.value, m.label])) as Record<
    WeatherMetric,
    string
  >;

export type WeatherData = {
  time: string[];
} & Partial<Record<WeatherMetric, number[]>>;

export interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

export interface LocationData {
  lat: number;
  lon: number;
  label?: string | undefined;
}

export interface ICurrentWeather {
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  pressure_msl: number;
  is_day: number;
  weather_code: number;
}