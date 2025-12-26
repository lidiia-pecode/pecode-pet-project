'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Box, Collapse } from '@mui/material';
import { ApolloProvider } from '@apollo/client/react';

import { styles } from './LocationPicker.styles';
import { LocationData, NominatimResult } from '@/types/Weather';
import { apolloClient } from '@/lib/graphql/apolloClient';
import {
  formatCoordinates,
  parseNominatim,
} from '@/lib/utils/weather/location';
import { useWeatherStore } from '@/store/weatherStore';
import { useLocationSearch } from '@/hooks/weather/useLocationSearch';

import { HeaderToggleButton } from './components/HeaderToggleButton';
import { LocationSearch } from './components/LocationSearch';
import { SuggestionList } from './components/SuggestionList';
import { CountryDropdown } from './components/CountryDropdown';




const MapComponent = dynamic(
  () => import('./components/MapComponent/MapComponent'),
  {
    ssr: false,
    loading: () => <Box sx={styles.mapWrapperLoading} />,
  }
);

const LocationHistoryList = dynamic(
  () => import('./components/LocationHistoryList/LocationHistoryList'),
  { ssr: false }
);

export const LocationPicker = () => {
  const [query, setQuery] = useState('');
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
    setShowSuggestions(true);
  }, []);

  const location = useWeatherStore(state => state.location);
  const setLocation = useWeatherStore(state => state.setLocation);

  const addLocationToHistory = useWeatherStore(
    state => state.addLocationToHistory
  );
  const setCountry = useWeatherStore(state => state.setCountry);

  const { suggestions, loading, error, clearSuggestions } =
    useLocationSearch(query);

  const toggleMap = useCallback(() => {
    setIsMapExpanded(prev => !prev);
  }, []);

  const handleConfirm = useCallback(() => {
    if (selectedLocation) {
      setIsMapExpanded(false);
      setLocation(selectedLocation);
      addLocationToHistory(selectedLocation);
    }
  }, [selectedLocation, addLocationToHistory, setLocation]);

  const handleSuggestionClick = useCallback(
    (item: NominatimResult) => {
      const parsedLocation = parseNominatim(item);
      setSelectedLocation(parsedLocation);
      setQuery(item.display_name);
      clearSuggestions();
      setCountry(null);
      setShowSuggestions(false);
    },
    [clearSuggestions, setCountry]
  );

  const handleMapClick = useCallback(
    (lat: number, lon: number) => {
      setSelectedLocation({ lat, lon });
      setQuery(formatCoordinates(lat, lon));
      setCountry(null);
    },
    [setCountry]
  );

  const clearSelection = useCallback(() => {
    setSelectedLocation(null);
    setQuery('');
    clearSuggestions();
  }, [clearSuggestions]);

  return (
    <Box sx={styles.root}>
      <HeaderToggleButton
        isOpen={isMapExpanded}
        isSelected={location !== null}
        location={location}
        onClick={toggleMap}
      />

      <Collapse in={isMapExpanded} timeout={200}>
        <Box sx={styles.collapseContent}>
          <Box sx={styles.leftPanel}>
            <Box sx={styles.searchWrapper}>
              <LocationSearch
                query={query}
                loading={loading}
                error={error}
                isSelected={selectedLocation !== null}
                onChange={handleQueryChange}
                onClear={clearSelection}
                onConfirm={handleConfirm}
              />
              <ApolloProvider client={apolloClient}>
                <CountryDropdown setSelectedLocation={setSelectedLocation} />
              </ApolloProvider>

              <SuggestionList
                suggestions={showSuggestions ? suggestions : []}
                onSelect={handleSuggestionClick}
              />
            </Box>

            <Box sx={styles.mapWrapper}>
              <MapComponent
                selected={selectedLocation}
                setShowSuggestions={setShowSuggestions}
                onClick={handleMapClick}
              />
            </Box>
          </Box>

          <LocationHistoryList onSelect={toggleMap} />
        </Box>
      </Collapse>
    </Box>
  );
};
