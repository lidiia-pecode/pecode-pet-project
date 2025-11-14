'use client';

import {
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { ProductFilters } from '@/types/Filters';

interface SearchBarProps {
  searchQuery: string;
  onChangeQuery: (updated: Partial<ProductFilters>) => void;
}

export const SearchBar = ({ searchQuery, onChangeQuery }: SearchBarProps) => {
  const [query, setQuery] = useState(searchQuery);
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    const handler = setTimeout(() => {
      onChangeQuery({ searchQuery: query.trim() });
    }, 500);

    return () => clearTimeout(handler);
  }, [query, onChangeQuery]);

  return (
    <TextField
      fullWidth
      size='small'
      placeholder={isSmUp ? 'Search products...' : 'Search...'}
      value={query}
      onChange={e => setQuery(e.target.value.trimStart())}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon color='action' />
            </InputAdornment>
          ),
          endAdornment: query && (
            <InputAdornment position='end'>
              <IconButton onClick={() => setQuery('')} size='small'>
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
      }}
    />
  );
};
