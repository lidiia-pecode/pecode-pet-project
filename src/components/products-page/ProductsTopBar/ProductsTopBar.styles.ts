import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

export const topBarStyles: Record<string, SxProps<Theme>> = {
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

  viewModeSwitcherContainer: {
    ml: 'auto',
    display: { xs: 'none', sm: 'block' },
  },
};
