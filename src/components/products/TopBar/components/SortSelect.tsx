'use client';

import { theme } from '@/styles/theme';
import { SORT_LABELS, SortOption } from '@/types/sortOptions';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';


interface SortSelectProps {
  sort: SortOption;
  onChange: (value: SortOption) => void;
}

export const SortSelect = ({ sort, onChange }: SortSelectProps) => {
  const handleChange = (e: SelectChangeEvent<SortOption>) => {
    onChange(e.target.value as SortOption);
  };

  return (
    <FormControl
      size='small'
      sx={{
        minWidth: 160,
        [theme.breakpoints.up('sm')]: {
          minWidth: 200, 
        },
      }}
    >
      <InputLabel id='sort-label'>Sort by</InputLabel>
      <Select
        labelId='sort-label'
        value={sort}
        label='Sort by'
        onChange={handleChange}
      >
        {Object.entries(SORT_LABELS).map(([value, label]) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
