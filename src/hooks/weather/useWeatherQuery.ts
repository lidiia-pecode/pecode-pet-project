import { useQuery } from '@tanstack/react-query';
import { useWeatherStore } from '@/store/weatherStore';
import { fetchWeather } from '@/lib/api/weather/weather';

export function useWeatherQuery() {
  const location = useWeatherStore(s => s.location);
  const metrics = useWeatherStore(s => s.metrics);

  return useQuery({
    queryKey: ['weather', location, metrics],
    queryFn: () => fetchWeather(location!.lat, location!.lon, metrics),
    enabled: !!location && metrics.length > 0,
    staleTime: 1000 * 60 * 10,
  });
}
