import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export const styles = {
  buttonBasic: {
    border: '1px solid #78cc1d',
    color: '#78cc1d',
    borderRadius: 1,
    '&:hover': {
      backgroundColor: '#fff',
      boxShadow: '0 0 8px #99E548',
    },
  },

  updateButtonVar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },

  buttonText: {
    component: 'span',
    fontSize: 14,
    fontWeight: 600,
    textTransform: 'uppercase',
  },
} satisfies Record<string, SxProps<Theme>>;
