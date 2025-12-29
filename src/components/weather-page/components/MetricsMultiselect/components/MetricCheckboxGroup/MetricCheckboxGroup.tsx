'use client';

import { Box, Checkbox, FormControlLabel } from '@mui/material';

import { MetricItem, WeatherMetric } from '@/types/Weather';
import { styles } from './MetricCheckboxGroup.styles';

interface Props {
  metrics: readonly MetricItem[];
  activeMetrics: WeatherMetric[];
  onToggle: (value: WeatherMetric) => void;
}

export const MetricCheckboxGroup = ({
  metrics,
  activeMetrics,
  onToggle,
}: Props) => {
  return (
    <Box sx={styles.checkboxWrapper}>
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
