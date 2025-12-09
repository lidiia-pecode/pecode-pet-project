import dayjs from 'dayjs';
import { Paper, Typography, Box } from '@mui/material';
import { WeatherMetric } from '@/types/Weather';
import { getMetricColor } from '../../constants';

interface TooltipPayloadItem {
  value?: string | number;
  dataKey?: string;
  name?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: readonly TooltipPayloadItem[];
  label?: string | number;
  metrics: WeatherMetric[];
  hoveredMetric: string | null;
  useIndividualTooltips: boolean;
  metricMap: Map<WeatherMetric, string>;
}

export const CustomTooltip = ({
  active,
  payload,
  label,
  metrics,
  hoveredMetric,
  useIndividualTooltips,
  metricMap
}: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;

  const filteredItems =
    useIndividualTooltips && hoveredMetric
      ? payload.filter(item => item.dataKey === hoveredMetric)
      : payload;

  if (!filteredItems.length) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        bgcolor: '#0d2872',
        color: 'white',
        p: 2,
        borderRadius: 2,
        minWidth: 140,
      }}
    >
      <Typography variant='body2' sx={{ fontWeight: 600, mb: 1 }}>
        {dayjs(label).format('D MMM, HH:mm')}
      </Typography>

      {filteredItems.map((item, idx) => {
        const key = item.dataKey as WeatherMetric;
        return (
          <Box
            key={`${key}-${idx}`}
            sx={{ color: getMetricColor(key, metrics), typography: 'body2' }}
          >
            {metricMap.get(key) ?? key}: {item.value}
          </Box>
        );
      })}
    </Paper>
  );
};
