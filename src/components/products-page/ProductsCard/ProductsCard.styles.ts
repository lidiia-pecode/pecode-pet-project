import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export const baseStyles: Record<string, SxProps<Theme>> = {
  card: {
    cursor: 'pointer',
    '&:hover': { boxShadow: 6 },
  },
  cardGrid: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardList: {
    display: 'grid',
    gridTemplateColumns: '60px 1fr 120px 100px',
    gap: 2,
    alignItems: 'center',
    borderBottom: '1px solid',
    borderColor: 'divider',
  },
  imageGrid: {
    width: '100%',
    height: 180,
    objectFit: 'contain',
    backgroundColor: 'background.paper',
  },
  imageList: {
    width: 60,
    height: 60,
    objectFit: 'contain',
    justifySelf: 'center',
  },
  title: {
    fontWeight: 600,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  description: {
    mt: 0.5,
    color: 'text.secondary',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
  price: {
    fontWeight: 700,
  },
};
