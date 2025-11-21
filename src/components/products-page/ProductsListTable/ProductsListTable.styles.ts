import { SxProps, Theme } from '@mui/material';

export const listTableStyles: Record<string, SxProps<Theme>> = {
  header: {
    display: 'grid',
    px: 1,
    py: 1,
    borderBottom: '2px solid',
    borderColor: 'divider',
    fontWeight: 700,
  },

  row: {
    display: 'grid',
    borderBottom: '1px solid',
    borderColor: 'divider',
    cursor: 'pointer',
    alignItems: 'center',
    '&:hover': { bgcolor: 'action.hover' },
  },

  image: {
    width: { xs: 64, sm: 64, md: 80 }, 
    height: { xs: 64, sm: 64, md: 80 },
    objectFit: 'cover',
    justifySelf: 'center',
  },

  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    ml: 1.5,
  },
};
