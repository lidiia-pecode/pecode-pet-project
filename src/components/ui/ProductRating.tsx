import { Box, Rating, Typography } from '@mui/material';

interface ProductRatingProps {
  value: number;
  count?: number;
  size?: 'small' | 'medium' | 'large';
  showCount?: boolean;
  align?: 'left' | 'center' | 'right';
}

export const ProductRating = ({
  value,
  count,
  size = 'small',
  showCount = true,
  align = 'left',
}: ProductRatingProps) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent={
        align === 'center'
          ? 'center'
          : align === 'right'
          ? 'flex-end'
          : 'flex-start'
      }
    >
      <Rating value={value} precision={0.5} size={size} readOnly />
      {showCount && (
        <Typography variant='body2' color='text.secondary' sx={{ ml: 0.5 }}>
          ({count ?? 0})
        </Typography>
      )}
    </Box>
  );
};
