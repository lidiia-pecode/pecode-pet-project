import { SxProps, Theme } from '@mui/material';

export const styles = {
  container: { width: 300, position: 'relative' },

  button: {
    height: 40,
    lineHeight: 1,
    '&:hover': { backgroundColor: '#899ad8' },
  },

  dropdown: {
    position: 'absolute',
    top: 46,
    left: 0,
    right: 0,
    zIndex: 30,
    maxHeight: 414,
    overflowY: 'auto',
    '::-webkit-scrollbar': { width: '5px' },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: '#eee',
      borderRadius: '8px',
    },
  },

  counrtyList: { pl: 0.5, maxHeight: 400, overflow: 'auto' },

  countrySearchWrapper: {
    p: 1,
    position: 'sticky',
    top: 0,
    zIndex: 2,
    bgcolor: 'background.paper',
  },

  listItemButton: { gap: 1 },

  noResults: { p: 2 },
} satisfies Record<string, SxProps<Theme>>;
