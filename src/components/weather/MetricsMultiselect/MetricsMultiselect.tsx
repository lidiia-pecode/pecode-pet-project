'use client';

import { Box } from '@mui/material';
import { WeatherMetric, TMetricTab, METRIC_TABS } from '@/types/Weather';

import { useWeatherStore } from '@/store/weatherStore';
import { MetricTabButton } from './components/MetricTabButton';
import { MetricCheckboxGroup } from './components/MetricCheckboxGroup';
import { DAILY_METRICS, HOURLY_METRICS } from '../constants';
import { metricsMultiselectStyles } from './MetricsMultiselect.styles';

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
    <Box sx={metricsMultiselectStyles.multiselectRoot}>
      <Box sx={metricsMultiselectStyles.tabContainer}>
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

      <Box sx={metricsMultiselectStyles.tabContentWrapper}>
        <Box
          sx={{
            ...metricsMultiselectStyles.tabContentInner,
            transform:
              metricMode === 'hourly' ? 'translateX(0%)' : 'translateX(-50%)',
          }}
        >
          <Box sx={metricsMultiselectStyles.tabPane}>
            <MetricCheckboxGroup
              metrics={HOURLY_METRICS}
              activeMetrics={metrics}
              onToggle={toggleMetric}
            />
          </Box>

          <Box sx={metricsMultiselectStyles.tabPane}>
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
