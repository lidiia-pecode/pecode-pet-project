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

export const WeatherChart = () => {
  const { data, isLoading, refetch, isFetching } = useWeatherQuery();
  const location = useWeatherStore(s => s.location);
  const metrics = useWeatherStore(s => s.metrics);

  const disabled = !location || metrics.length === 0;
  const needsReload = !isLoading && !isFetching && !!data;

  const [expandChart, setExpandChart] = useState(false);
  const toggleExpandChart = () => setExpandChart(prev => !prev);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
        <Box sx={{ mt: 2, p: 2, borderRadius: 2, border: '1px solid #ddd' }}>
          {!data && !isLoading && (
            <Typography variant='body2' color='text.secondary'>
              No data loaded yet. Select metrics and click &quot;Get
              Forecast&quot;.
            </Typography>
          )}

          {data && !isLoading && (
            <Box>
              <pre style={{ fontSize: 12, background: '#f4f4f4', padding: 10 }}>
                {JSON.stringify(data.hourly, null, 2)}
              </pre>
            </Box>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};
