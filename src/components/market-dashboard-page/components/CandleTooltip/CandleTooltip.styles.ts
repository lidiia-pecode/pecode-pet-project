import { SxProps, Theme } from '@mui/material';

export const styles = {
  rootBox: {
    position: { xs: 'absolute', lg: 'static' },
    bottom: { xs: 160, md: 200 },
    display: 'flex',
    alignItems: 'center',
    rowGap: 2,
    height: { xs: 'auto', md: 40 },
    borderRadius: 1,
    width: { xs: 'fit-content', md: '100%' },
    maxWidth: { xs: 320, md: 480 },
    flexWrap: { xs: 'wrap', md: 'nowrap' },
    backgroundColor: '#06073e',
  },

  itemBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 2,
  },

  itemTitle: { color: '#819dd8ff', fontSize: 14 },
  itemValue: { color: '#a3ffdd', fontSize: 14, fontFamily: 'monospace' },
} satisfies Record<string, SxProps<Theme>>;
