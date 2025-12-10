import { METRICS } from "@/components/weather/constants";

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


export interface Country {
  code: string;
  name: string;
  emoji: string;
}

export interface GetCountriesData {
  countries: Country[];
}