'use client';

import { Box } from '@mui/material';
import { WeatherMetric, TMetricTab, METRIC_TABS } from '@/types/Weather';

import { useWeatherStore } from '@/store/weatherStore';
import { MetricTabButton } from './components/MetricTabButton';
import { MetricCheckboxGroup } from './components/MetricCheckboxGroup';
import { DAILY_METRICS, HOURLY_METRICS } from '../constants';

export const MetricsMultiselect = () => {
  const metrics = useWeatherStore(state => state.metrics);
  const metricMode = useWeatherStore(s => s.metricMode);

  const setMetrics = useWeatherStore(state => state.setMetrics);
  const setMetricMode = useWeatherStore(s => s.setMetricMode);

  const switchTab = (tab: TMetricTab) => {
    setMetricMode(tab);
    setMetrics([]);
  };

  const toggleMetric = (value: WeatherMetric) => {
    setMetrics(
      metrics.includes(value)
        ? metrics.filter(m => m !== value)
        : [...metrics, value]
    );
  };

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Box sx={{ display: 'flex', mb: 2, borderBottom: '1px solid #ccc' }}>
        {METRIC_TABS.map(tab => (
          <MetricTabButton
            key={tab.id}
            tab={tab.id}
            active={metricMode === tab.id}
            label={tab.label}
            onClick={switchTab}
          />
        ))}
      </Box>

      <Box sx={{ overflow: 'hidden', width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            width: '200%',
            transform:
              metricMode === 'hourly' ? 'translateX(0%)' : 'translateX(-50%)',
            transition: 'transform 0.3s ease',
          }}
        >
          <Box sx={{ width: '50%', p: 1 }}>
            <MetricCheckboxGroup
              metrics={HOURLY_METRICS}
              activeMetrics={metrics}
              onToggle={toggleMetric}
            />
          </Box>

          <Box sx={{ width: '50%', p: 1 }}>
            <MetricCheckboxGroup
              metrics={DAILY_METRICS}
              activeMetrics={metrics}
              onToggle={toggleMetric}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
