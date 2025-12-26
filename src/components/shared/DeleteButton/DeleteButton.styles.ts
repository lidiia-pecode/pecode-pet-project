import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

export const styles = {
  wrapper: {
    border: '1px solid #ff33925f',
    borderRadius: '4px',
    backgroundColor: '#ffffff5d',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#ffffffc2',
    },
  },

  wrapperCard: {
    position: 'absolute',
    top: 8,
    left: 8,
  },

  wrapperCategory: {
    height: 24,
    width: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteIcon: {
    color: '#ff33928d',
  },

  deleteIconCategory: {
    height: 16,
    width: 16,
  },

  deleteIconCard: {
    height: 22,
    width: 22,
  },

  dialogTitle: { display: 'flex', alignItems: 'center', gap: 1 },
  dialogActions: { px: 3, pb: 3 },
} satisfies Record<string, SxProps<Theme>>;
