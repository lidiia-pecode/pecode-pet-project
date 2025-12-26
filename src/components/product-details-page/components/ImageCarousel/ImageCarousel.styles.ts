import { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    width: '100%',
    maxWidth: 450,
    margin: '0 auto',

    '& .swiper-button-prev, & .swiper-button-next': {
      opacity: 0,
      width: 80,
      height: '100%',
      top: 0,
      transform: 'none',
    },

    '& .swiper-button-disabled': {
      opacity: 0,
    },
  },

  mainWrapper: {
    position: 'relative',
    width: '100%',
    aspectRatio: '1 / 1',
    borderRadius: 2,
    overflow: 'hidden',
  },

  thumbImage: {
    position: 'relative',
    width: '100%',
    paddingTop: '100%',
    borderRadius: 2,
    overflow: 'hidden',
    cursor: 'pointer',
  },

  decoArrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 32,
    height: 32,
    background: 'white',
    borderRadius: '50%',
    boxShadow: 3,
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
} satisfies Record<string, SxProps<Theme>>;
