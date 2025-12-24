import { SxProps, Theme } from '@mui/material';

export const styles = {
  featuresContainer: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
    gap: 4,
    mb: 10,
  },
  cardContainer: {
    height: '100%',
    borderRadius: 4,
    bgcolor: 'background.paper',
  },

  cardContent: {
    p: { xs: 2, sm: 4 },
  },
  
  featureTitle: {
    fontWeight: 700,
    fontSize: { xs: 20, sm: 24 },
    color: 'text.primary',
  },

  iconWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    mr: 2,
  },

  featureDescription: {
    mb: 2,
    color: 'text.secondary',
    fontSize: '1rem',
  },

  chipsTitle: {
    fontSize: '1rem',
    mb: 1,
    fontWeight: 600,
    color: 'text.secondary',
  },

  chipsList: {
    component: 'ul',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
  },

  chipItem: {
    component: 'li',
    width: 'fit-content',
    px: 2,
    py: 0.5,
    borderRadius: 4,
    backgroundColor: '#dae0f9ff',
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    color: 'text.secondary',
    fontSize: 14,
    '&::before': {
      content: '"•"',
      color: 'primary.main',
      fontWeight: 'bold',
      fontSize: '1rem',
    },
  },
} satisfies Record<string, SxProps<Theme>>;
