'use client';

import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { ChangeEvent, useEffect, useState } from 'react';
import { useProductsStore } from '@/store/productsStore';
import { searchBarStyles } from '../ProductsTopBar.styles';

export const SearchBar = () => {
  const searchQuery = useProductsStore(state => state.filters.searchQuery);
  const updateFilters = useProductsStore(state => state.updateFilters);

  const [inputValue, setInputValue] = useState(searchQuery || '');

  const handleChangeInputValue = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
  };
  
  const handleClearInputValue = () => setInputValue('');

  useEffect(() => {
    const handler = setTimeout(() => {
      updateFilters({ searchQuery: inputValue.trim() });
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue, updateFilters]);

  return (
    <TextField
      id='search-input'
      fullWidth
      size='small'
      placeholder='Search...'
      value={inputValue}
      onChange={handleChangeInputValue}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon color='action' />
            </InputAdornment>
          ),
          endAdornment: inputValue && (
            <InputAdornment position='end'>
              <IconButton onClick={handleClearInputValue} size='small'>
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      sx={searchBarStyles.textField}
    />
  );
};
