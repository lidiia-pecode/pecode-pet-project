'use client';

import { Box, Typography } from '@mui/material';
import { styles } from './EmptyState.styles';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

export const EmptyState = ({
  title = 'Nothing found',
  subtitle,
}: EmptyStateProps) => {
  return (
    <Box sx={styles.container}>
      <Box
        component='img'
        src={'/nothing-found/data-not-found.jpg'}
        alt='Empty state'
        sx={styles.image}
      />

      <Box sx={styles.textContainer}>
        <Typography variant='h6' sx={styles.title}>
          {title}
        </Typography>

        {subtitle && (
          <Typography variant='body2' sx={styles.subtitle}>
            {subtitle}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
