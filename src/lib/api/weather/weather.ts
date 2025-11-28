import { HourlyMetric } from "@/types/Weather";

export async function fetchWeather(
  latitude: number,
  longitude: number,
  metrics: HourlyMetric[] = [],
) {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    timezone: 'auto',
  });

  if (metrics.length) params.append('hourly', metrics.join(','));

  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Weather API error');

  return res.json();
}
