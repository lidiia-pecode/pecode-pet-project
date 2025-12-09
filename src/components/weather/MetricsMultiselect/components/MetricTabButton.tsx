'use client';

import { TMetricTab } from '@/types/Weather';
import { Box } from '@mui/material';

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
        flex: 1,
        textAlign: 'center',
        py: 1,
        fontWeight: 600,
        cursor: 'pointer',
        color: active ? '#fff' : 'text.secondary',
        backgroundColor: active ? 'primary.main' : 'grey.100',
      }}
      onClick={() => onClick(tab)}
    >
      {label}
    </Box>
  );
};
