import { useQuery } from '@tanstack/react-query';
import { useWeatherStore } from '@/store/weatherStore';
import { fetchCurrentWeather } from '@/lib/api/weather/weather';
import { DEFAULT_LOCATION } from '@/components/weather/constants';

export function useCurrentWeatherQuery() {
  const location = useWeatherStore(s => s.location);

  const lat = location?.lat ?? DEFAULT_LOCATION.lat;
  const lon = location?.lon ?? DEFAULT_LOCATION.lon;

  return useQuery({
    queryKey: ['current_weather', lat, lon],
    queryFn: () => fetchCurrentWeather(lat, lon),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
}
