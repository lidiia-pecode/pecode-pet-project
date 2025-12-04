import { CurrentWeather, HourlyData, HourlyMetric } from '@/types/Weather';

export async function fetchWeather(
  latitude: number,
  longitude: number,
  metrics: HourlyMetric[] = []
): Promise<HourlyData> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    timezone: 'auto',
  });

  if (metrics.length) {
    params.append('hourly', metrics.join(','));
  }

  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Weather API error');
  }

  const json = await res.json();

  return json.hourly as HourlyData;
}

export async function fetchCurrentWeather(
  latitude: number,
  longitude: number
): Promise<CurrentWeather> {
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
  return json.current as CurrentWeather;
}
