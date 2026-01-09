import { SxProps, Theme } from '@mui/material';

export const styles = {
  rootBox: {
    p: 2,
    backgroundColor: '#06073e',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    width: 280,
  },

  rootTitle: {
    fontWeight: 'bold',
    mb: 2,
    color: '#819dd8ff',
    textAlign: 'center',
  },

  bidsTitle: { fontWeight: 'bold', color: '#30d422', mt: 2, mb: 1 },
  asksTitle: { fontWeight: 'bold', color: '#ff3c66', mb: 1 },

  titlesRow: {
    display: 'flex',
    justifyContent: 'space-between',
    mb: 1,
  },

  titleCell: { fontSize: 12, color: '#819dd8ff' },

  valueRow: {
    display: 'flex',
    justifyContent: 'space-between',
    mb: 0.5,
    borderRadius: 2,
    px: 1,
  },

  bestAskRow: { backgroundColor: 'rgba(255, 92, 92, 0.2)' },
  bestBidRow: { backgroundColor: 'rgba(72, 187, 120, 0.2)' },

  askCell: { color: '#ff5f87', fontWeight: 'normal' },
  bidCell: { color: '#5dc12f', fontWeight: 'normal' },
  bestCell: { fontWeight: 'bold' },

  loaderBox: {
    backgroundColor: '#06073e',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    width: 280,
  },
} satisfies Record<string, SxProps<Theme>>;
