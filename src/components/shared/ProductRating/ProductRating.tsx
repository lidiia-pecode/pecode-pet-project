import { Box, Rating, Typography } from '@mui/material';
import { styles } from './ProductRating.styles';

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
  const containerStyle =
    align === 'center'
      ? styles.containerCenter
      : align === 'right'
      ? styles.containerRight
      : styles.containerLeft;

  return (
    <Box sx={containerStyle}>
      <Rating value={value} precision={0.5} size={size} readOnly />

      {showCount && (
        <Typography
          variant='body2'
          color='text.secondary'
          sx={styles.countText}
        >
          ({count ?? 0})
        </Typography>
      )}
    </Box>
  );
};
