'use client';

import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

interface SearchBarProps {
  mobile?: boolean;
}

export const SearchBar = ({ mobile = false }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  return (
    <Box
      sx={{
        width: mobile ? '100%' : '100%',
      }}
    >
      <TextField
        fullWidth
        size='small'
        placeholder='Search products...'
        value={query}
        onChange={e => setQuery(e.target.value)}
        InputProps={{
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
        }}
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          },
        }}
      />
    </Box>
  );
};
