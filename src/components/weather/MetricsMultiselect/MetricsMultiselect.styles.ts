import { SxProps, Theme } from '@mui/material';

export const metricsMultiselectStyles = {
  multiselectRoot: {
    width: '100%',
    mb: 3,
  },

  tabContainer: {
    display: 'flex',
    mb: 2,
    borderBottom: '1px solid #ccc',
  },

  tabContentWrapper: {
    overflow: 'hidden',
    width: '100%',
  },

  tabContentInner: {
    display: 'flex',
    width: '200%',
    transition: 'transform 0.3s ease',
  },

  tabPane: {
    width: '50%',
    p: 1,
  },
} satisfies Record<string, SxProps<Theme>>;


export const metricCheckboxGroupStyles = {
  checkboxWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 1,
  },
} satisfies Record<string, SxProps<Theme>>;

export const metricTabButtonStyles = {
  baseButton: {
    flex: 1,
    textAlign: 'center',
    py: 1,
    fontWeight: 600,
    cursor: 'pointer',
  },

  inactiveButton: {
    color: 'text.secondary',
    backgroundColor: 'grey.100',
  },

  activeButton: {
    color: '#fff',
    backgroundColor: 'primary.main',
  },
} satisfies Record<string, SxProps<Theme>>;
