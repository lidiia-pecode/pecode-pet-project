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
      sx={{
        height: 40,
        lineHeight: 1,
        '&:hover': { backgroundColor: '#899ad8' },
      }}
    >
      {selectedCountry?.name || 'Select a Country'}
    </Button>
  );

  const renderDropdown = (): ReactNode => (
    <Paper
      elevation={1}
      sx={{
        position: 'absolute',
        top: 46,
        left: 0,
        right: 0,
        zIndex: 30,
        maxHeight: 414,
        overflowY: 'auto',
        '::-webkit-scrollbar': { width: '5px' },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#eee',
          borderRadius: '8px',
        },
      }}
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
      <Box sx={{ width: 300, position: 'relative' }}>
        {renderButton()}
        {open && renderDropdown()}
      </Box>
    </ClickAwayListener>
  );
};
