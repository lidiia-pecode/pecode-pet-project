import { SxProps, Theme } from '@mui/material';

export const styles = {
  autocomplete: {
    width: 280,
    backgroundColor: 'primary.main',
    borderRadius: 1,
    '& .MuiOutlinedInput-root': {
      color: '#fff',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#f7f7f752',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#fff',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#ffffffa9',
      },
      '& input::placeholder': {
        color: '#fff',
        opacity: 1
      },
    },
    '& .MuiInputLabel-root': {
      color: '#fff',
      '&.Mui-focused': {
        color: '#fff',
      },
      '&.MuiInputLabel-shrink': {
        color: '#fff',
      },
    },
    '& .MuiAutocomplete-clearIndicator': {
      color: '#fff',
    },
    '& .MuiAutocomplete-popupIndicator': {
      color: '#fff',
    },
  },
} satisfies Record<string, SxProps<Theme>>;
