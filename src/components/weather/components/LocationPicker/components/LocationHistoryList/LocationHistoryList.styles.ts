import { SxProps, Theme } from '@mui/material';

export const styles = {
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

  titleHistory: { opacity: 0.7 },

  titleText: { fontWeight: 500 },

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

