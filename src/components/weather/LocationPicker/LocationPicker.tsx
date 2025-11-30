'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Box, Collapse } from '@mui/material';
import { useWeatherStore } from '@/store/weatherStore';
import { HeaderToggleButton } from './components/HeaderToggleButton';
import { SearchField } from './components/SearchField';
import { SuggestionList } from './components/SuggestionsList';
import { NominatimResult } from '@/types/Weather';
import { useLocationSearch } from '@/hooks/weather/useLocationSearch';
import { formatCoordinates, parseNominatim } from '@/lib/utils/weather/location';


const MapComponent = dynamic(() => import('../MapComponent'), {
  ssr: false,
  loading: () => <Box sx={{ height: 420, bgcolor: 'grey.100' }} />,
});

export const LocationPicker = () => {
  const [query, setQuery] = useState('');
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  const location = useWeatherStore(state => state.location);
  const setLocation = useWeatherStore(state => state.setLocation);

  const { suggestions, loading, error, clearSuggestions } =
    useLocationSearch(query);

  const isLocationSelected = location !== null;

  const toggleMap = useCallback(() => {
    setIsMapExpanded(prev => !prev);
  }, []);

  const handleConfirm = useCallback(() => {
    if (location) {
      setIsMapExpanded(false);
    }
  }, [location]);

  const handleSuggestionClick = useCallback(
    (item: NominatimResult) => {
      const parsedLocation = parseNominatim(item);
      setLocation(parsedLocation);
      setQuery(item.display_name);
      clearSuggestions();
    },
    [setLocation, clearSuggestions]
  );

  const handleMapClick = useCallback(
    (lat: number, lon: number) => {
      setLocation({ lat, lon });
      setQuery(formatCoordinates(lat, lon));
    },
    [setLocation]
  );

  const clearSelection = useCallback(() => {
    setLocation(null);
    setQuery('');
    clearSuggestions();
  }, [setLocation, clearSuggestions]);

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <HeaderToggleButton
        isOpen={isMapExpanded}
        isSelected={isLocationSelected}
        location={location}
        onClick={toggleMap}
      />

      <Collapse in={isMapExpanded} timeout={200}>
        <Box sx={{ position: 'relative', mt: 2 }}>
          <SearchField
            query={query}
            loading={loading}
            error={error}
            isSelected={isLocationSelected}
            onChange={setQuery}
            onClear={clearSelection}
            onConfirm={handleConfirm}
          />

          <SuggestionList
            suggestions={suggestions}
            onSelect={handleSuggestionClick}
          />
        </Box>

        <Box sx={{ width: '100%', height: 420 }}>
          <MapComponent selected={location} onClick={handleMapClick} />
        </Box>
      </Collapse>
    </Box>
  );
};
