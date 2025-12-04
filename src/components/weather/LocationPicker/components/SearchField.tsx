'use client'

import {
  Box,
  TextField,
  IconButton,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

interface SearchFieldProps {
  query: string;
  loading: boolean;
  error: string | null;
  isSelected: boolean;
  onChange: (value: string) => void;
  onClear: () => void;
  onConfirm: () => void;
}

export const SearchField = ({
  query,
  loading,
  error,
  isSelected,
  onChange,
  onClear,
  onConfirm,
}: SearchFieldProps) => {
  const showClearButton = isSelected || query;
  const showConfirmButton = isSelected;

  return (
    <TextField
      id='weather-search'
      fullWidth
      size='small'
      placeholder='Enter a city or address…'
      value={query}
      onChange={e => onChange(e.target.value)}
      error={!!error}
      helperText={error}
      variant='outlined'
      slotProps={{
        input: {
          startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
          endAdornment: (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {loading && <CircularProgress size={18} />}

              {error && (
                <Tooltip title={error}>
                  <ErrorIcon fontSize='small' color='error' />
                </Tooltip>
              )}

              {showClearButton && (
                <Tooltip title='Clear'>
                  <IconButton size='small' onClick={onClear} edge='end'>
                    <CloseIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              )}

              {showConfirmButton && (
                <Tooltip title='Confirm location'>
                  <IconButton onClick={onConfirm}>
                    <CheckCircleIcon
                      fontSize='medium'
                      sx={{
                        color: '#68b04c',
                        boxShadow: '0 0 10px rgba(94, 166, 0, 0.6)',
                        borderRadius: '50%',
                      }}
                    />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          ),
        },
      }}
    />
  );
};
