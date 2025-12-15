'use client';

import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useWeatherQuery } from '@/hooks/weather/useWeatherQuery';
import { useWeatherStore } from '@/store/weatherStore';
import { useState, useMemo } from 'react';
import { ChartRenderer } from './components/ChartRenderer';
import { LocationData, WeatherData, WeatherMetric } from '@/types/Weather';
import { weatherChartStyles } from './weatherChart.styles';

interface CachedWeatherState {
  data: WeatherData;
  location: LocationData;
  metrics: WeatherMetric[];
}

export const WeatherChart = () => {
  const location = useWeatherStore(s => s.location);
  const metrics = useWeatherStore(s => s.metrics);

  const { isLoading, isFetching, refetch } = useWeatherQuery();

  const [chartExpanded, setChartExpanded] = useState(false);
  const [cachedState, setCachedState] = useState<CachedWeatherState | null>(
    null
  );

  const canFetch = !!location && metrics.length > 0;

  const hasParametersChanged = useMemo(() => {
    if (!cachedState) return false;

    const locationChanged =
      cachedState.location.lat !== location?.lat ||
      cachedState.location.lon !== location?.lon;

    const metricsChanged = cachedState.metrics.join(',') !== metrics.join(',');

    return locationChanged || metricsChanged;
  }, [cachedState, location, metrics]);

  const shouldBlurChart = hasParametersChanged && !isFetching;

  const handleFetchWeather = async () => {
    if (!canFetch || !location) return;

    const result = await refetch();

    if (result?.data) {
      setCachedState({
        data: result.data,
        location,
        metrics: [...metrics],
      });
      setChartExpanded(true);
    }
  };

  const toggleChart = () => setChartExpanded(prev => !prev);

  if (!cachedState) {
    return (
      <Box sx={{ width: '100%', mt: 3 }}>
        <Button
          fullWidth
          variant='contained'
          disabled={!canFetch || isLoading}
          sx={weatherChartStyles.button}
          onClick={handleFetchWeather}
        >
          {isLoading && <CircularProgress size={20} sx={{ color: 'white' }} />}
          <Typography>Get Forecast</Typography>
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Box sx={{ position: 'relative' }}>
        <Box sx={weatherChartStyles.header}>
          <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
            Weather Forecast
          </Typography>

          <IconButton
            size='small'
            onClick={toggleChart}
            sx={{
              transform: chartExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s',
            }}
            aria-label={chartExpanded ? 'Collapse chart' : 'Expand chart'}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>

        {chartExpanded && (
          <>
            <Box
              sx={{
                ...weatherChartStyles.chartContainer,
                filter: shouldBlurChart ? 'blur(2px)' : 'none',
                pointerEvents: shouldBlurChart ? 'none' : 'initial',
              }}
            >
              <ChartRenderer
                data={cachedState.data}
                metrics={cachedState.metrics}
              />
            </Box>

            {hasParametersChanged && (
              <Box sx={weatherChartStyles.overlay}>
                <Button
                  variant='contained'
                  disabled={!canFetch || isFetching}
                  sx={weatherChartStyles.overlayButton}
                  onClick={handleFetchWeather}
                >
                  {isFetching && (
                    <CircularProgress size={20} sx={{ color: 'white' }} />
                  )}

                  <RefreshIcon />

                  <Typography>Update Forecast</Typography>
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};
