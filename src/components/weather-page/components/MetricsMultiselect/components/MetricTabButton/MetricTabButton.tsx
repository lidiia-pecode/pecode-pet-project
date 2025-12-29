'use client';

import { TMetricTab } from '@/types/Weather';
import { Box } from '@mui/material';
import { styles } from './MetricTabButton.styles';

interface Props {
  tab: TMetricTab;
  active: boolean;
  label: string;
  onClick: (tab: TMetricTab) => void;
}

export const MetricTabButton = ({ tab, active, label, onClick }: Props) => {
  return (
    <Box
      sx={{
        ...styles.baseButton,
        ...(active
          ? styles.activeButton
          : styles.inactiveButton),
      }}
      onClick={() => onClick(tab)}
    >
      {label}
    </Box>
  );
};
