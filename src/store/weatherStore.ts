'use client';

import { Country, LocationData, TMetricTab, WeatherMetric } from '@/types/Weather';
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

export const useWeatherStore = create<WeatherState>(set => {
  let initialHistory: LocationData[] = [];
  if (typeof window !== 'undefined') {
    initialHistory = JSON.parse(
      sessionStorage.getItem('location_history') || '[]'
    );
  }

  return {
    metrics: [],
    metricMode: 'hourly',
    location: null,
    locationHistory: initialHistory,
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
      set({ locationHistory: [] });
    },

    setCountry: selectedCountry => set({ selectedCountry }),
  };
});
