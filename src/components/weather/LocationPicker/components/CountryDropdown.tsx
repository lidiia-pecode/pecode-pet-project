'use client';

import {
  useState,
  useCallback,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import {
  Box,
  Button,
  Paper,
  List,
  ListItemButton,
  Typography,
  ClickAwayListener,
} from '@mui/material';
import { useQuery } from '@apollo/client/react';
import { GET_COUNTRIES } from '@/lib/graphql/query/getCountries';
import { getCountryCoordinates } from '@/lib/utils/weather/getCountryCoordinates';
import { Country, GetCountriesData, LocationData } from '@/types/Weather';
import { useWeatherStore } from '@/store/weatherStore';
import { countryDropdownStyles } from '../LocationPicker.styles';



interface CountryDropdownProps {
  setSelectedLocation: Dispatch<SetStateAction<LocationData | null>>;
}

export const CountryDropdown = ({
  setSelectedLocation,
}: CountryDropdownProps) => {
  const [open, setOpen] = useState(false);
  const selectedCountry = useWeatherStore(state => state.selectedCountry);
  const setCountry = useWeatherStore(state => state.setCountry);

  const { data, loading, error } = useQuery<GetCountriesData>(GET_COUNTRIES);
  const countries = data?.countries ?? [];

  const toggleOpen = () => setOpen(prev => !prev);
  const closeDropdown = () => setOpen(false);

  const handleSelect = useCallback(
    async (selectedCountry: Country) => {
      setCountry(selectedCountry);
      setOpen(false);

      const coords = await getCountryCoordinates(selectedCountry.name);
      if (coords) {
        setSelectedLocation(coords);
      }
    },
    [setCountry, setSelectedLocation]
  );

  const renderButton = (): ReactNode => (
    <Button
      fullWidth
      variant='contained'
      onClick={toggleOpen}
      sx={countryDropdownStyles.button}
    >
      {selectedCountry?.name || 'Select a Country'}
    </Button>
  );

  const renderDropdown = (): ReactNode => (
    <Paper
      elevation={1}
      sx={countryDropdownStyles.dropdown}
    >
      <List sx={{ pl: 0.5 }}>
        {countries.map(c => (
          <ListItemButton
            key={c.code}
            onClick={() => handleSelect(c)}
            selected={selectedCountry?.code === c.code}
          >
            <Typography sx={{ mr: 1 }}>{c.emoji}</Typography>
            <Typography>{c.name}</Typography>
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );

  if (loading) return <Typography>Loading countries...</Typography>;
  if (error) return <Typography>Error loading countries</Typography>;

  return (
    <ClickAwayListener onClickAway={closeDropdown}>
      <Box sx={countryDropdownStyles.container}>
        {renderButton()}
        {open && renderDropdown()}
      </Box>
    </ClickAwayListener>
  );
};
