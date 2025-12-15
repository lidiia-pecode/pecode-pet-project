import { SxProps, Theme } from '@mui/material';

export const currentWeatherStyles = {
  rootBase: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 3,
    position: 'relative',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    mb: 3,
  },

  day: {
    backgroundColor: '#ffffff',
    color: '#000',
  },

  night: {
    backgroundColor: '#0f1e40',
    color: '#fff',
  },

  icon: {
    position: 'absolute',
    top: 16,
    right: 16,
  },

  title: {
    position: 'absolute',
    top: 16,
    left: 16,
    fontWeight: 600,
    maxWidth: 320,
  },

  content: {
    display: 'flex',
    gap: 6,
    justifyContent: 'center',
  },
} satisfies Record<string, SxProps<Theme>>;

export const weatherStatsStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
    p: 3,
    alignItems: 'flex-start',
  },

  tempRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },

  tempIcon: {
    ml: '-10px',
  },

  feelsLike: {
    opacity: 0.8,
  },

  statRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  },
} satisfies Record<string, SxProps<Theme>>;

export const currentWeatherSkeletonStyles = {
  container: {
    width: '100%',
    height: 300,
    borderRadius: 3,
    p: 3,
    mb: 3,
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #ffffff 0%, #6c81ce 100%)',
  },
} satisfies Record<string, SxProps<Theme>>;

export const weatherAdviceStyles = {
  wrapper: { position: 'relative' },
  button: {
    position: 'absolute',
    bottom: 8,
    right: 10,
    borderRadius: '50%',
    color: '#6c81ce',
  },
  popperPaper: {
    p: 2,
    width: 'fit-content',
    maxWidth: 400,
    borderRadius: 2,
    background: '#fff',
    boxShadow: '0 0 20px #0004',
    position: 'relative',
    '&:before': {
      content: '""',
      position: 'absolute',
      bottom: -12,
      right: 20,
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
      borderTop: '12px solid #fff',
    },
  },
  loadingBox: { display: 'flex', alignItems: 'center', gap: 2 },
} satisfies Record<string, SxProps<Theme>>;
