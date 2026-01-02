import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

export const styles = {
  container: {
    width: 380,
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 1,
  },

  headerTitle: {
    fontWeight: 600,
    color: 'primary.main',
  },

  empty: {
    mt: 3,
    textAlign: 'center',
    opacity: 0.7,
  },

  items: {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    py: 2,
  '&::-webkit-scrollbar': {
    width: 6,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#b5c7f8ff',
    borderRadius: 3,
  },

  },

  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mb: 2,
    pr: 2,
    borderRadius: 2,
    position: 'relative',
    backgroundColor: '#f4f6fb',
  },

  link: {
    display: 'flex',
  },

  image: { borderRadius: 8, objectFit: 'cover', width: 64, height: 64 },

  removeBtn: {
    position: 'absolute',
    top: -8,
    right: 2,

    color: 'primary.main',
    bgcolor: '#fff',
    boxShadow: '0 2px 6px #0000001f',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& svg': {
      fontSize: 12,
    },

    '&:hover': {
      color: '#ffaacaff',
      bgcolor: '#fff',
    },
  },

  info: {
    flex: 1,
    minWidth: 0,
  },

  title: {
    fontSize: 14,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  price: {
    fontSize: 13,
    opacity: 0.7,
  },

  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  },

  ctrlBtn: {
    color: 'primary.main',
    borderRadius: 1,
  },

  qty: {
    minWidth: 24,
    textAlign: 'center',
    fontSize: 14,
  },

  footer: { mt: 2 },

  total: {
    '& > span': {
      fontWeight: 600,
      color: 'primary.main',
    },
    mb: 2,
  },
} satisfies Record<string, SxProps<Theme>>;
