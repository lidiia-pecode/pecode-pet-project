'use client';

import { TextField, InputAdornment, IconButton } from '@mui/material';
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
      placeholder='Search products...'
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
