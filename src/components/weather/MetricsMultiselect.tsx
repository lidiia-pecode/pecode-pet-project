'use client';
import React, { useState } from 'react';
import {
  Checkbox,
  FormControlLabel,
  Collapse,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { HOURLY_METRICS, HourlyMetric } from '@/types/Weather';
import { useWeatherStore } from '@/store/weatherStore';

export const MetricsCheckboxList = () => {
  const [expandMetrics, setExpandMetrics] = useState(true);
  const toggleExpandMetrics = () => setExpandMetrics(prev => !prev);

  const metrics = useWeatherStore(state => state.metrics);
  const setMetrics = useWeatherStore(state => state.setMetrics);

  const handleToggle = (value: HourlyMetric) => {
    if (metrics.includes(value)) {
      setMetrics(metrics.filter(val => val !== value));
    } else {
      setMetrics([...metrics, value]);
    }
  };

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          mb: 2,
        }}
        onClick={toggleExpandMetrics}
      >
        <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
          Select Weather Metrics
        </Typography>
        <IconButton
          size='small'
          sx={{
            transform: expandMetrics ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: '0.2s',
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </Box>

      <Collapse in={expandMetrics} timeout={200}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 0.5,
          }}
        >
          {HOURLY_METRICS.map(metric => (
            <FormControlLabel
              key={metric.value}
              control={
                <Checkbox
                  size='small'
                  checked={metrics.includes(metric.value)}
                  onChange={() => handleToggle(metric.value)}
                  sx={{ py: 0.5 }}
                />
              }
              label={metric.label}
            />
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};
