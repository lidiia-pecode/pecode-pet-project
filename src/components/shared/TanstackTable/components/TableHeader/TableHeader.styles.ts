import { SxProps, Theme } from '@mui/material';

export const colResizerStyles = {
  box: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    width: 6,
    cursor: 'col-resize',
    zIndex: 20,
    '&:hover': { backgroundColor: 'primary.main', opacity: 0.3 },
  },
} satisfies Record<string, SxProps<Theme>>;

export const tableHeaderStyles = {
  container: {
    display: 'flex',
    height: 40,
    backgroundColor: 'action.hover',
    borderBottom: '1px solid #ddd',
  },
} satisfies Record<string, SxProps<Theme>>;

export const tableHeaderCellStyles = {
  base: {
    display: 'flex',
    alignItems: 'center',
    px: 1,
    borderRight: '1px solid #ddd',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  pinned: {
    position: 'sticky',
    backgroundColor: 'primary.main',
    color: '#ddd',
    zIndex: 10,
  },

  unpinned: {
    position: 'relative',
    backgroundColor: 'action.hover',
    color: 'text.secondary',
    zIndex: 5,
  },

  sortable: {
    cursor: 'pointer',
  },

  sortIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    ml: 0.5,
    flexShrink: 0,
  },
} satisfies Record<string, SxProps<Theme>>;
