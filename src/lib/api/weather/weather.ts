import {
  ICurrentWeather,
  WeatherMetric,
  WeatherData,
  TMetricTab,
} from '@/types/Weather';

export async function fetchWeather(
  latitude: number,
  longitude: number,
  metrics: WeatherMetric[] = [],
  mode: TMetricTab
): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    timezone: 'auto',
  });
  params.append(`${mode}`, metrics.join(','));

  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Weather API error');
  }

  const json = await res.json();

  return {
    ...json.hourly,
    ...json.daily,
  } as WeatherData;
}

export async function fetchCurrentWeather(
  latitude: number,
  longitude: number
): Promise<ICurrentWeather> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    timezone: 'auto',
    current: [
      'temperature_2m',
      'apparent_temperature',
      'relative_humidity_2m',
      'wind_speed_10m',
      'pressure_msl',
      'is_day',
      'weather_code',
    ].join(','),
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Weather API error');
  }

  const json = await res.json();
  return json.current as ICurrentWeather;
}

export async function getWeatherAdvice(data: ICurrentWeather): Promise<string> {
  const res = await fetch('/api/weather', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data }),
  });

  const result = await res.json();
  return result.advice;
}
