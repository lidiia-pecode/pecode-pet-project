import { Box, Button } from '@mui/material';
import { styles } from './IntervalSelector.styles';
import { INTERVALS } from '@/lib/utils/market-dashboard/constants';

export const IntervalSelector = ({
  interval,
  setInterval,
}: {
  interval: number;
  setInterval: (value: number) => void;
}) => {
  return (
    <Box sx={styles.container}>
      {INTERVALS.map(i => (
        <Button
          key={i.value}
          variant={interval === i.value ? 'contained' : 'outlined'}
          size='small'
          onClick={() => setInterval(i.value)}
        >
          {i.label}
        </Button>
      ))}
    </Box>
  );
};
