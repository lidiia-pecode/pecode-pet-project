import { HourlyMetric, LocationData } from '@/types/Weather';
import { create } from 'zustand';

interface WeatherState {
  location: LocationData | null;
  metrics: HourlyMetric[];
  locationHistory: LocationData[];

  setLocation: (loc: LocationData | null) => void;
  addLocationToHistory: (loc: LocationData) => void;
  clearHistory: () => void;
  setMetrics: (m: HourlyMetric[]) => void;
}

export const useWeatherStore = create<WeatherState>(set => {
  let initialHistory: LocationData[] = [];
  if (typeof window !== 'undefined') {
    initialHistory = JSON.parse(
      sessionStorage.getItem('location_history') || '[]'
    );
  }

  return {
    location: null,
    metrics: [],
    locationHistory: initialHistory,

    setLocation: location => set({ location }),
    setMetrics: metrics => set({ metrics }),
    addLocationToHistory: loc =>
      set(state => {
        const filtered = state.locationHistory.filter(
          l => l.lat !== loc.lat || l.lon !== loc.lon
        );
        const newHistory = [...filtered, loc];

        if (typeof window !== 'undefined') {
          sessionStorage.setItem(
            'location_history',
            JSON.stringify(newHistory)
          );
        }

        return { locationHistory: newHistory };
      }),

    clearHistory: () => {
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('location_history');
      }
      return { locationHistory: [] };
    },
  };
});
