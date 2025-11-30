'use client';

import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReplayIcon from '@mui/icons-material/Replay';
import { useWeatherQuery } from '@/hooks/weather/useWeatherQuery';
import { useWeatherStore } from '@/store/weatherStore';
import { useState } from 'react';
import { ChartRenderer } from './components/ChartRenderer';

export const WeatherChart = () => {
  const { data, isLoading, refetch, isFetching } = useWeatherQuery();
  const location = useWeatherStore(s => s.location);
  const metrics = useWeatherStore(s => s.metrics);

  const disabled = !location || metrics.length === 0;
  const needsReload = !isLoading && !isFetching && !!data;

  const [expandChart, setExpandChart] = useState(false);
  const toggleExpandChart = () => setExpandChart(prev => !prev);

  console.log(data);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, margin: '0 auto'}}>
        <Button
          disabled={disabled}
          onClick={() => {
            refetch();
            toggleExpandChart();
          }}
        >
          {isLoading ? <CircularProgress size={20} /> : 'Get Forecast'}
        </Button>

        {needsReload && !isLoading && (
          <IconButton onClick={() => refetch()} color='primary'>
            <ReplayIcon />
          </IconButton>
        )}

        <IconButton
          size='small'
          sx={{
            transform: expandChart ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: '0.2s',
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </Box>

      <Collapse in={expandChart} timeout={200}>
        <Box
          sx={{
            mt: 2,
            py: 2,
            borderRadius: 2,
            border: '1px solid #ddd',
            backgroundColor: '#6995d8',
          }}
        >
          {!data && !isLoading && (
            <Typography variant='body2' color='text.secondary'>
              No data loaded yet. Select metrics and click &quot;Get
              Forecast&quot;.
            </Typography>
          )}

          {data && !isLoading && (
            <ChartRenderer data={data} metrics={metrics} />
          )}
        </Box>
      </Collapse>
    </Box>
  );
};
