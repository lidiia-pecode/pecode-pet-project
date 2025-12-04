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

export const metricLabels = Object.fromEntries(
  HOURLY_METRICS.map(m => [m.value, m.label])
);

export type HourlyMetric = (typeof HOURLY_METRICS)[number]['value'];

export type HourlyData = {
  time: string[];
} & Partial<Record<HourlyMetric, number[]>>;

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

export interface CurrentWeather {
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  pressure_msl: number;
  is_day: number;
  weather_code: number;
}