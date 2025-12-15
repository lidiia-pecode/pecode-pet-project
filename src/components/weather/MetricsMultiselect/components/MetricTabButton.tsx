'use client';

import { TMetricTab } from '@/types/Weather';
import { Box } from '@mui/material';
import { metricTabButtonStyles } from '../MetricsMultiselect.styles';

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
        ...metricTabButtonStyles.baseButton,
        ...(active
          ? metricTabButtonStyles.activeButton
          : metricTabButtonStyles.inactiveButton),
      }}
      onClick={() => onClick(tab)}
    >
      {label}
    </Box>
  );
};
