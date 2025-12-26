import { SxProps, Theme } from '@mui/material';

export const styles = {
  container: { mb: 4 },
  title: {
    fontSize: { xs: 32, sm: 48, md: 56 },
    fontWeight: 700,
    background: 'linear-gradient(135deg, #667eea 0%, #541196ff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: { xs: 14, sm: 18 },
    letterSpacing: -0.5,
    color: '#5a719bff',
  },
} satisfies Record<string, SxProps<Theme>>;
