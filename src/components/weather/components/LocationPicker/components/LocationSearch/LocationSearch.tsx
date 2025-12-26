'use client';

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

import { styles } from './LocationSearch.styles';
import { useWeatherStore } from '@/store/weatherStore';


interface LocationSearchProps {
  query: string;
  loading: boolean;
  error: string | null;
  isSelected: boolean;
  onChange: (value: string) => void;
  onClear: () => void;
  onConfirm: () => void;
}

export const LocationSearch = ({
  query,
  loading,
  error,
  isSelected,
  onChange,
  onClear,
  onConfirm,
}: LocationSearchProps) => {
  const selectedCountry = useWeatherStore(state => state.selectedCountry);
  const showClearButton = (isSelected && !selectedCountry) || query;
  const showConfirmButton = isSelected && !selectedCountry;

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
          startAdornment: <SearchIcon sx={styles.startAdornment} />,
          endAdornment: (
            <Box sx={styles.endAdornmentWrapper}>
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
                      sx={styles.confirmIcon}
                    />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          ),
        },
      }}
      sx={styles.textField}
    />
  );
};
