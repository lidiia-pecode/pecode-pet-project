import { SxProps, Theme } from '@mui/material';

export const productBreadcrumbsStyles = {
  container: {
    overflow: 'hidden',
    display: { xs: 'block', md: 'none' },
    mb: 4,
  },
  breadcrumbs: {
    fontSize: 14,
    '& .MuiBreadcrumbs-ol': {
      flexWrap: 'nowrap',
    },
    '& .MuiBreadcrumbs-li:not(:last-of-type)': {
      flexShrink: 0,
    },
    '& .MuiBreadcrumbs-separator': {
      flexShrink: 0,
    },
    '& .MuiBreadcrumbs-li:last-of-type': {
      minWidth: 0,
      overflow: 'hidden',
    },
  },
  lastItem: {
    fontSize: 14,
  },
} satisfies Record<string, SxProps<Theme>>;
