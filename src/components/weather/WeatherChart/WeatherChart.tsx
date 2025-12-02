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
import { useWeatherQuery, WeatherData } from '@/hooks/weather/useWeatherQuery';
import { useWeatherStore } from '@/store/weatherStore';
import { useState, useMemo } from 'react';
import { ChartRenderer } from './components/ChartRenderer';
import { HourlyMetric, LocationData } from '@/types/Weather';
import { STYLES } from './weatherChart.styles';


export const WeatherChart = () => {
  const location = useWeatherStore(s => s.location);
  const metrics = useWeatherStore(s => s.metrics);

  const { isLoading, isFetching, refetch } = useWeatherQuery();

  const [chartExpanded, setChartExpanded] = useState(false);
  const [cachedData, setCachedData] = useState<WeatherData | null>(null);
  const [lastFetchedLocation, setLastFetchedLocation] =
    useState<LocationData | null>(null);
  const [lastFetchedMetrics, setLastFetchedMetrics] = useState<HourlyMetric[]>(
    []
  );

  const canFetch = !!location && metrics.length > 0;

  const hasParametersChanged = useMemo(() => {
    if (!cachedData || !lastFetchedLocation) return false;

    const locationChanged =
      lastFetchedLocation.lat !== location?.lat ||
      lastFetchedLocation.lon !== location?.lon;

    const metricsChanged =
      lastFetchedMetrics.length !== metrics.length ||
      lastFetchedMetrics.some(m => !metrics.includes(m));

    return locationChanged || metricsChanged;
  }, [cachedData, lastFetchedLocation, location, metrics, lastFetchedMetrics]);

  const shouldBlurChart = hasParametersChanged && !isFetching;

  const handleFetchClick = async () => {
    if (!canFetch) return;

    const result = await refetch();

    if (result?.data) {
      setCachedData(result.data);
      setLastFetchedLocation(location);
      setLastFetchedMetrics([...metrics]);
      setChartExpanded(true);
    }
  };

  const toggleChart = () => setChartExpanded(prev => !prev);


  if (!cachedData) {
    return (
      <Box sx={{ width: '100%', mt: 2 }}>
        <Button
          fullWidth
          variant='contained'
          disabled={!canFetch || isLoading}
          sx={STYLES.button}
          onClick={handleFetchClick}
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
        <Box sx={STYLES.header}>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            Weather Forecast
          </Typography>

          <IconButton
            size='small'
            onClick={toggleChart}
            sx={STYLES.expandIcon(chartExpanded)}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>

        {chartExpanded && (
          <>
            <Box sx={STYLES.chartContainer(shouldBlurChart)}>
              <ChartRenderer data={cachedData} metrics={lastFetchedMetrics} />
            </Box>

            {hasParametersChanged && (
              <Box sx={STYLES.overlay}>
                <Button
                  variant='contained'
                  disabled={!canFetch || isFetching}
                  sx={STYLES.overlayButton}
                  onClick={handleFetchClick}
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
