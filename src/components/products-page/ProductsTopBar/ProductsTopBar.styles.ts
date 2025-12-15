import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

export const topBarStyles = {
  searchBarContainer: {
    display: 'flex',
    gap: 2,
    mb: 1,
  },

  filtersBarContainer: {
    display: 'flex',
    alignItems: 'end',
    py: 1,
    minHeight: 56,
  },

  filtersBarInner: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  filtersButton: {
    display: { xs: 'inline-flex', md: 'none' },
    height: 40,
    mr: 2,
  },

  activeFiltersBarContainer: {
    display: { xs: 'none', md: 'block' },
  },

  viewModeSwitcherContainer: {
    ml: 'auto',
    display: { xs: 'none', sm: 'block' },
  },
} satisfies Record<string, SxProps<Theme>>;

export const addProductButtonStyles = {
  iconButton: {
    border: '1px solid #78cc1d',
    color: '#78cc1d',
    borderRadius: 1,
    mr: { sm: 2 },
    '&:hover': {
      backgroundColor: '#fff',
      boxShadow: '0 0 8px #99E548',
    },
  },
} satisfies Record<string, SxProps<Theme>>;


export const searchBarStyles = {
  textField: {
    bgcolor: 'background.paper',
    borderRadius: 2,
  },
} satisfies Record<string, SxProps<Theme>>;

export const sortSelectStyles = {
  formControl: {
    minWidth: {
      xs: 160, sm: 200
    }
  },
} satisfies Record<string, SxProps<Theme>>;