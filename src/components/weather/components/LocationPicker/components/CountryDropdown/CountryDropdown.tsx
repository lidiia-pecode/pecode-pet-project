'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import {
  Box,
  Button,
  Paper,
  List,
  Typography,
  ClickAwayListener,
  CircularProgress,
  TextField,
  ListItemButton,
} from '@mui/material';

import { styles } from './CountryDropdown.styles';
import { Country, GetCountriesData, LocationData } from '@/types/Weather';
import { GET_COUNTRIES } from '@/lib/graphql/query/getCountries';
import { getCountryCoordinates } from '@/lib/utils/weather/getCountryCoordinates';
import { getSortedCountriesByQuery } from '@/lib/utils/weather/getSortedCountriesByQuery';
import { highlightMatch } from '@/lib/utils/weather/highlightMatch';
import { useWeatherStore } from '@/store/weatherStore';


interface CountryDropdownProps {
  setSelectedLocation: (location: LocationData | null) => void;
}

export const CountryDropdown: React.FC<CountryDropdownProps> = ({
  setSelectedLocation,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedCountry = useWeatherStore(state => state.selectedCountry);
  const setCountry = useWeatherStore(state => state.setCountry);

  const { data, loading, error } = useQuery<GetCountriesData>(GET_COUNTRIES);

  const handleCountrySelect = useCallback(
    async (country: Country) => {
      setCountry(country);
      setSearchQuery('');
      setIsOpen(false);

      const coordinates = await getCountryCoordinates(country.name);
      if (coordinates) setSelectedLocation(coordinates);
    },
    [setCountry, setSelectedLocation]
  );

  const sortedCountries = useMemo(
    () => getSortedCountriesByQuery(data?.countries ?? [], searchQuery),
    [data?.countries, searchQuery]
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setSearchQuery('');
  }, []);

  const toggleDropdown = useCallback(() => setIsOpen(prev => !prev), []);

  if (loading) return <CircularProgress />;
  if (error)
    return <Typography color='error'>Something went wrong.</Typography>;

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box sx={styles.container}>
        <Button
          fullWidth
          variant='contained'
          onClick={toggleDropdown}
          sx={styles.button}
        >
          {selectedCountry
            ? `${selectedCountry.emoji} ${selectedCountry.name}`
            : 'Select Country'}
        </Button>

        {isOpen && (
          <Paper elevation={3} sx={styles.dropdown}>
            <Box sx={styles.countrySearchWrapper}>
              <TextField
                fullWidth
                size='small'
                placeholder='Search country...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
              />
            </Box>

            <List sx={styles.counrtyList}>
              {sortedCountries.length > 0 ? (
                sortedCountries.map(country => (
                  <ListItemButton
                    key={country.code}
                    onClick={() => handleCountrySelect(country)}
                    selected={selectedCountry?.code === country.code}
                    sx={styles.listItemButton}
                  >
                    <Typography component='span'>{country.emoji}</Typography>
                    <Typography component='span'>
                      {highlightMatch(country.name, searchQuery)}
                    </Typography>
                  </ListItemButton>
                ))
              ) : (
                <Typography color='text.secondary' sx={styles.noResults}>
                  No countries found.
                </Typography>
              )}
            </List>
          </Paper>
        )}
      </Box>
    </ClickAwayListener>
  );
};
