import { HourlyMetric } from '@/types/Weather';
import { create } from 'zustand';

interface WeatherState {
  location: { lat: number; lon: number; label?: string } | null;
  metrics: HourlyMetric[];

  setLocation: (loc: WeatherState['location']) => void;
  setMetrics: (m: HourlyMetric[]) => void;
}

export const useWeatherStore = create<WeatherState>(set => ({
  location: null,
  metrics: [],
  chartOpen: false,

  setLocation: location => set({ location }),
  setMetrics: metrics => set({ metrics }),
}));
