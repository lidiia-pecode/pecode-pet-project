'use client';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#6c81ceff' },
    secondary: { main: '#54235dff' },
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
    text: {
      primary: '#171717',
      secondary: '#555',
    },
  },
  typography: {
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
        },
        a: {
          textDecoration: 'none',
          color: 'inherit',
        },
        '*': {
          boxSizing: 'border-box',
        },
      },
    },
  },
});
