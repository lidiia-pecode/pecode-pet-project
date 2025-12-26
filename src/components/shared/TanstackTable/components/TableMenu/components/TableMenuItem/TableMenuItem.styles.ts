import { SxProps, Theme } from '@mui/material';

export const styles = {
  dragIndicator: { opacity: 1 },
  
  dragIndicatorPinned: { opacity: 0.3 },

  text: {
    fontWeight: 400,
    color: 'inherit',
  },

  pinnedText: {
    fontWeight: 600,
    color: 'primary.main',
  },
} satisfies Record<string, SxProps<Theme>>;
