import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

export const styles = {
  container: {
    maxWidth: 260,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontWeight: 600,
  },

  formGroup: { minHeight: 200, maxWidth: 260 },

  categoryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
} satisfies Record<string, SxProps<Theme>>;
