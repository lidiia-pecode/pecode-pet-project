import { SxProps, Theme } from '@mui/material';

export const styles = {
  container: {
    width: 300,
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontWeight: 600,
    color: 'primary.main',
  },

  avatar: { width: 88, height: 88, fontSize: 28 },

  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 1,
  },

  userForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    mb: 2,
    '& > :first-child': {
      mb: 2,
    },
  },

  accountDetailsBox: { mt: 2, display: 'grid', gap: 1.5 },

  actionsWrapper: { display: 'flex', flexDirection: 'column', gap: 2 },
  detailsTextBox: { display: 'flex', alignItems: 'center', gap: 1 },
  detailsText: {
    color: 'text.secondary',
  },
} satisfies Record<string, SxProps<Theme>>;
