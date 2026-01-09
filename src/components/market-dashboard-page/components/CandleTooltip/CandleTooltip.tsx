import { memo } from 'react';
import { Box, Typography } from '@mui/material';

import { styles } from './CandleTooltip.styles';
import { OHLC } from '@/types/MarketDashboard';

interface CandleTooltipProps {
  candle: OHLC | null;
}

const formatValue = (label: string, value: number) =>
  label === 'Volume' ? value.toLocaleString() : value.toFixed(2);

const CandleTooltipComponent = ({ candle }: CandleTooltipProps) => {
  if (!candle) return null;

  const items = [
    ['Open', candle.open],
    ['High', candle.high],
    ['Low', candle.low],
    ['Close', candle.close],
    ['Volume', candle.volume],
  ] as const;

  return (
    <Box sx={styles.rootBox}>
      {items.map(([label, value]) => (
        <Box key={label} sx={styles.itemBox}>
          <Typography sx={styles.itemTitle}>{label}</Typography>
          <Typography sx={styles.itemValue}>
            {formatValue(label, value)}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export const CandleTooltip = memo(CandleTooltipComponent);
