import { SxProps, Theme } from '@mui/material';

export const locationPickerStyles = {
  root: {
    width: '100%',
    mb: 2,
  },

  collapseContent: {
    display: 'flex',
    gap: 2,
    mt: 2,
  },

  leftPanel: {
    flex: 1,
  },

  searchWrapper: {
    display: 'flex',
    position: 'relative',
  },

  mapWrapper: {
    width: '100%',
    height: 420,
  },
} satisfies Record<string, SxProps<Theme>>;

export const suggestionListStyles = {
  paper: {
    position: 'absolute',
    top: '105%',
    left: 0,
    right: 0,
    zIndex: 20,
  },
} satisfies Record<string, SxProps<Theme>>;

export const searchFieldStyles = {
  textField: {
    backgroundColor: '#fff',
    '&:hover fieldset': {
      borderColor: '#6c81ce !important',
    },
  },
  startAdornment: {
    mr: 1,
    color: 'action.active',
  },
  endAdornmentWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  },
  confirmIcon: {
    color: '#68b04c',
    boxShadow: '0 0 10px rgba(94, 166, 0, 0.6)',
    borderRadius: '50%',
  },
} satisfies Record<string, SxProps<Theme>>;

export const locationHistoryListStyles = {
  root: {
    width: 340,
    height: 460,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    px: 1.5,
    py: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 1,
    backgroundColor: '#edf2fa',
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  clearButton: {
    py: 1,
    cursor: 'pointer',
    borderRadius: 1,
    color: 'primary.main',
  },
  listContainer: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  loadMoreButton: {
    px: 1,
    py: 0.7,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 0.7,
    cursor: 'pointer',
    color: 'primary.main',
    fontSize: 13,
    '&:hover': { bgcolor: 'grey.100' },
    borderBottom: '1px solid #eee',
  },
  listItem: {
    px: 1.5,
    py: 1,
    cursor: 'pointer',
    '&:hover': { bgcolor: 'grey.100' },
  },
} satisfies Record<string, SxProps<Theme>>;

export const headerToggleButtonStyles = {
  button: {
    justifyContent: 'flex-start',
    paddingY: 1.2,
    borderRadius: 2,
    textTransform: 'none',
    transition: '0.2s',
    backgroundColor: 'background.paper',
    '&:hover': { backgroundColor: '#edf2fa' },
  },

  icon: { mr: 1 },

  contentBox: {
    flexGrow: 1,
    textAlign: 'left',
    display: 'flex',
    gap: 2,
    alignItems: 'center',
  },

  mainText: { fontWeight: 600 },

  expandIconOpen: { transform: 'rotate(180deg)', transition: '0.2s' },
  expandIconClosed: { transform: 'rotate(0deg)', transition: '0.2s' },
} satisfies Record<string, SxProps<Theme>>;

export const countryDropdownStyles = {
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
} satisfies Record<string, SxProps<Theme>>;
