'use client';

import { Box, Checkbox, FormControlLabel } from '@mui/material';
import {MetricItem, WeatherMetric } from '@/types/Weather';

interface Props {
  metrics: readonly MetricItem[];
  activeMetrics: WeatherMetric[];
  onToggle: (value: WeatherMetric) => void;
}

export const MetricCheckboxGroup = ({ metrics, activeMetrics, onToggle }: Props) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 1,
      }}
    >
      {metrics.map(metric => (
        <FormControlLabel
          key={metric.value}
          control={
            <Checkbox
              size='small'
              checked={activeMetrics.includes(metric.value)}
              onChange={() => onToggle(metric.value)}
            />
          }
          label={metric.label}
        />
      ))}
    </Box>
  );
};
