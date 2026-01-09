'use client';

import { Box, Typography, SxProps, Theme } from '@mui/material';
import { keyframes } from '@emotion/react';

import { styles } from './DotsLoader.style';

interface DotsLoaderProps {
  text: string;
  fontSize?: number | string;
  color?: string;
  dotSize?: number;
  wrapperSx?: SxProps<Theme>;
}

export const DotsLoader = ({
  text,
  fontSize = 16,
  color = '#819dd8ff',
  dotSize = 6,
  wrapperSx,
}: DotsLoaderProps) => {
  const blink = keyframes`
    0%, 80%, 100% { opacity: 0 }
    40% { opacity: 1 }
  `;

  return (
    <Box sx={{ ...styles.root, ...wrapperSx }}>
      <Typography sx={{...styles.text, fontSize, color }}>
        {text}
      </Typography>
      <Box sx={styles.dotsContainer}>
        {[1, 2, 3].map(i => (
          <Box
            key={i}
            sx={{
              width: dotSize,
              height: dotSize,
              borderRadius: '50%',
              backgroundColor: color,
              animation: `${blink} 1.4s infinite both`,
              animationDelay: `${(i - 1) * 0.2}s`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
