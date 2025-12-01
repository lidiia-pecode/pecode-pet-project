import dayjs from 'dayjs';
import { Paper, Typography, Box } from '@mui/material';
import { HOURLY_METRICS, HourlyMetric } from '@/types/Weather';
import { COLORS } from '../../constants';

interface TooltipPayloadItem {
  name?: string;
  value?: string | number;
  dataKey?: string;
  color?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: readonly TooltipPayloadItem[];
  label?: string | number;
  hoveredLine: string | null;
  showAll: boolean;
  metrics: HourlyMetric[];
}

const metricLabels = Object.fromEntries(
  HOURLY_METRICS.map(m => [m.value, m.label])
);

export const CustomTooltip = ({
  active,
  payload,
  label,
  hoveredLine,
  showAll,
  metrics,
}: CustomTooltipProps) => {
  if (!active || !payload?.length || (showAll && !hoveredLine)) return null;

  const filtered =
    showAll && hoveredLine
      ? payload.filter(p => p.dataKey === hoveredLine)
      : payload;

  if (!filtered.length) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        bgcolor: '#0d2872',
        color: 'common.white',
        p: 2,
        borderRadius: 2,
        minWidth: 120,
      }}
    >
      <Typography variant='body2' sx={{ fontWeight: 600, mb: 1 }}>
        {dayjs(label).format('D MMM, HH:mm')}
      </Typography>

      {filtered.map((item, i) => {
        const key = item.dataKey ?? item.name ?? '';
        const idx = metrics.indexOf(key as HourlyMetric);
        const color =
          idx >= 0 ? COLORS[idx % COLORS.length] : COLORS[i % COLORS.length];

        return (
          <Box key={`${key}-${i}`} sx={{ color, typography: 'body2' }}>
            {metricLabels[key] ?? key}: {item.value}
          </Box>
        );
      })}
    </Paper>
  );
};
