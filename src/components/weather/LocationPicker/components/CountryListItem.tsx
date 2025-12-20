import React from 'react';
import { ListItemButton, Typography } from '@mui/material';
import { Country } from '@/types/Weather';
import { highlightMatch } from '@/lib/utils/weather/highlightMatch';

interface CountryListItemProps {
  country: Country;
  selected: boolean;
  query: string;
  onSelect: (country: Country) => void;
}

const CountryListItem = ({ country, selected, query, onSelect }: CountryListItemProps) => (
  <ListItemButton
    onClick={() => onSelect(country)}
    selected={selected}
    sx={{ gap: 1 }}
  >
    <Typography component='span'>{country.emoji}</Typography>
    <Typography component='span'>
      {highlightMatch(country.name, query)}
    </Typography>
  </ListItemButton>
);

export default React.memo(CountryListItem);