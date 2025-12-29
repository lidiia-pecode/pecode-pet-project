import { SxProps, Theme } from '@mui/material';

export const styles = {
  textField: {
    backgroundColor: '#fff',
    '&:hover fieldset': {
      borderColor: '#6c81ce !important',
    },
  },

  startAdornment: {
    mr: 1,
    color: 'action.active',
  },

  endAdornmentWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  },
  
  confirmIcon: {
    color: '#68b04c',
    boxShadow: '0 0 10px rgba(94, 166, 0, 0.6)',
    borderRadius: '50%',
  },
} satisfies Record<string, SxProps<Theme>>;