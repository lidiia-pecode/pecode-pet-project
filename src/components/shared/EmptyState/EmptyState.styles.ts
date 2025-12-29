import { SxProps } from '@mui/material';

export const styles = {
  container: {
    position: 'relative',
    pt: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 2,
  },

  image: {
    maxWidth: 500,
    width: '100%',
    aspectRatio: 1 / 1,
    objectFit: 'contain',
  },

  textContainer: {
    position: 'absolute',
    top: 48,
  },

  title: {
    fontSize: { xs: 32, md: 48 },
    fontWeight: 600,
    opacity: 0.7,
  },

  subtitle: {
    opacity: 0.7,
  },
} satisfies Record<string, SxProps>;
