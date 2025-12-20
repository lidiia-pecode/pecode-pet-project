import React from 'react';
import { Box, TextField } from '@mui/material';
import { countryDropdownStyles } from '../LocationPicker.styles';

interface CountrySearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const CountrySearch = ({ value, onChange }: CountrySearchProps) => (
  <Box sx={countryDropdownStyles.countrySearchWrapper}>
    <TextField
      fullWidth
      size='small'
      placeholder='Search country...'
      value={value}
      onChange={e => onChange(e.target.value)}
      autoFocus
    />
  </Box>
);
