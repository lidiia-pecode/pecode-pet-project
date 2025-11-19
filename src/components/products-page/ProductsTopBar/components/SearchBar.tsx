'use client';

import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useResponsive } from '@/hooks/useResponsive';
import { useProductsParams } from '@/hooks/useProductsParams';

export const SearchBar = () => {
  const { isMobile } = useResponsive();
  const { filters, updateFilters } = useProductsParams();

  const [query, setQuery] = useState(filters.searchQuery || '');

  useEffect(() => {
    const handler = setTimeout(() => {
      updateFilters({ searchQuery: query.trim() });
    }, 500);

    return () => clearTimeout(handler);
  }, [query, updateFilters]);

  return (
    <TextField
      fullWidth
      size='small'
      placeholder={isMobile ? 'Search...' : 'Search products...'}
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
