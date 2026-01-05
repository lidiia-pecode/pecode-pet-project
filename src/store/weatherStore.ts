'use client';

import { Country, LocationData, TMetricTab, WeatherMetric } from '@/types/Weather';
import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';

interface WeatherState {
  metrics: WeatherMetric[];
  metricMode: TMetricTab;
  location: LocationData | null;
  locationHistory: LocationData[];
  selectedCountry: Country | null,

  setMetrics: (m: WeatherMetric[]) => void;
  setMetricMode: (mode: TMetricTab) => void;
  setLocation: (loc: LocationData | null) => void;
  addLocationToHistory: (loc: LocationData) => void;
  clearHistory: () => void;
  setCountry: (val: Country | null) => void;
}

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set) => ({
      metrics: [],
      metricMode: 'hourly',
      location: null,
      locationHistory: [],
      selectedCountry: null,

      setMetrics: metrics => set({ metrics }),
      setMetricMode: mode => set({ metricMode: mode }),
      setLocation: location => set({ location }),
      addLocationToHistory: loc =>
        set(state => {
          const filtered = state.locationHistory.filter(
            l => l.lat !== loc.lat || l.lon !== loc.lon
          );
          const newHistory = [...filtered, loc];

          return { locationHistory: newHistory };
        }),

      clearHistory: () => set({ locationHistory: [] }),

      setCountry: selectedCountry => set({ selectedCountry }),
    }),
    {
      name: 'weather-store',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ locationHistory: state.locationHistory }),
    }
  )
);
