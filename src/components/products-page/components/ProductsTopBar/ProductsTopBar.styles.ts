import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

export const styles = {
  searchBarContainer: {
    display: 'flex',
    gap: 2,
    mb: 1,
  },

  filtersBarOuter: { mb: 2 },

  filtersBarInner: {
    flex: 1,
    gap: 2,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  filtersButton: {
    display: { xs: 'inline-flex', md: 'none' },
    height: 40,
  },

  activeFiltersBarContainer: {
    display: { xs: 'none', md: 'block' },
  },

  viewModeSwitcherContainer: {
    ml: 'auto',
    display: { xs: 'none', sm: 'block' },
  },
} satisfies Record<string, SxProps<Theme>>;
