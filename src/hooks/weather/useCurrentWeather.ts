import { useQuery } from '@tanstack/react-query';

import { DEFAULT_LOCATION } from '@/lib/utils/weather/constants';
import { useWeatherStore } from '@/store/weatherStore';
import { fetchCurrentWeather } from '@/lib/api/weather/weather';
import { useAutoLocation } from './useAutoLocation';

export function useCurrentWeatherQuery() {
  const selectedLocation = useWeatherStore(s => s.location);
  const { autoLocation } = useAutoLocation();

  const lat =
    selectedLocation?.lat ?? (autoLocation?.lat || DEFAULT_LOCATION.lat);
  const lon =
    selectedLocation?.lon ?? (autoLocation?.lon || DEFAULT_LOCATION.lon);

  return useQuery({
    queryKey: ['current_weather', lat, lon],
    queryFn: () => fetchCurrentWeather(lat, lon),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
}
