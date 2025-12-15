'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Box, Collapse } from '@mui/material';
import { useWeatherStore } from '@/store/weatherStore';
import { HeaderToggleButton } from './components/HeaderToggleButton';
import { SearchField } from './components/SearchField';
import { SuggestionList } from './components/SuggestionsList';
import { LocationData, NominatimResult } from '@/types/Weather';
import { useLocationSearch } from '@/hooks/weather/useLocationSearch';
import {
  formatCoordinates,
  parseNominatim,
} from '@/lib/utils/weather/location';
import { CountryDropdown } from './components/CountryDropdown';
import { apolloClient } from '@/lib/graphql/apolloClient';
import { ApolloProvider } from '@apollo/client/react';
import { locationPickerStyles } from './LocationPicker.styles';

const MapComponent = dynamic(() => import('./components/MapComponent'), {
  ssr: false,
  loading: () => <Box sx={{ height: 420, bgcolor: 'grey.100' }} />,
});

const LocationHistoryList = dynamic(
  () => import('./components/LocationHistoryList'),
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
    <Box sx={locationPickerStyles.root}>
      <HeaderToggleButton
        isOpen={isMapExpanded}
        isSelected={location !== null}
        location={location}
        onClick={toggleMap}
      />

      <Collapse in={isMapExpanded} timeout={200}>
        <Box sx={locationPickerStyles.collapseContent}>
          <Box sx={locationPickerStyles.leftPanel}>
            <Box sx={locationPickerStyles.searchWrapper}>
              <SearchField
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

            <Box sx={locationPickerStyles.mapWrapper}>
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
