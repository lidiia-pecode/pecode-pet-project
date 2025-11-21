'use client';

import { useProductsStore } from '@/store/productsStore';
import { theme } from '@/styles/theme';
import { SORT_LABELS, SortOption } from '@/types/Sort';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

export const SortSelect = () => {
  const sortOption = useProductsStore(state => state.sortOption);
  const setSortOption = useProductsStore(state => state.setSortOption);

  const handleChange = (e: SelectChangeEvent<SortOption>) => {
    setSortOption(e.target.value as SortOption);
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
        value={sortOption}
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
