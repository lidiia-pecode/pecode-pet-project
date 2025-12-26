import { SxProps } from '@mui/material';
import { Theme } from '@emotion/react';

export const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 1,
  },
  
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    flexGrow: 1,
    minHeight: 520,
    overflowX: 'hidden',
  },
} satisfies Record<string, SxProps<Theme>>;
