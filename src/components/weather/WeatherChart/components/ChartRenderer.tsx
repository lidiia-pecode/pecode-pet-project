'use client';

import dayjs from 'dayjs';
import { useState, useMemo } from 'react';
import { HourlyData, HourlyMetric, HOURLY_METRICS } from '@/types/Weather';
import { COLORS } from '../../constants';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useResponsive } from '@/hooks/ui/useResponsive';
import { CustomTooltip } from './CustomTooltip';


interface ChartRendererProps {
  data: HourlyData;
  metrics: HourlyMetric[];
}

const metricLabels = Object.fromEntries(
  HOURLY_METRICS.map(m => [m.value, m.label])
);


export const ChartRenderer = ({ data, metrics }: ChartRendererProps) => {
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);
  const { isTablet } = useResponsive();
  const useIndividualTooltips = metrics.length > 5;

  const chartData = useMemo(() => {
    return data.time.map((time, idx) => {
      const point: Record<string, string | number> = { time };
      metrics.forEach(m => {
        if (data[m]?.[idx] != null) point[m] = data[m][idx];
      });
      return point;
    });
  }, [data, metrics]);

  const xAxisTicks = useMemo(() => {
    const days = new Map<string, string | number>();
    chartData.forEach(p => {
      const day = dayjs(p.time).format('YYYY-MM-DD');
      if (!days.has(day)) days.set(day, p.time);
    });
    return Array.from(days.values());
  }, [chartData]);

  const getOpacity = (metric: string) => {
    if (!useIndividualTooltips) return 1;
    return hoveredLine ? (hoveredLine === metric ? 1 : 0.4) : 0.5;
  };

  const chartMargin = isTablet
    ? { top: 10, right: 0, left: 0, bottom: 10 }
    : { top: 10, right: 20, left: 0, bottom: 10 };

  return (
    <ResponsiveContainer width='100%' height={380}>
      <LineChart data={chartData} margin={chartMargin}>
        <XAxis
          dataKey='time'
          ticks={xAxisTicks}
          tickFormatter={t => dayjs(t).format('D MMM')}
          tick={{ fontSize: 12, fill: '#1e3a8a' }}
          stroke='#1e3a8a'
        />
        <YAxis stroke='#1e3a8a' tick={{ fontSize: 12, fill: '#1e3a8a' }} />

        <Tooltip
          cursor={useIndividualTooltips ? false : undefined}
          content={props => (
            <CustomTooltip
              {...props}
              hoveredLine={hoveredLine}
              showAll={useIndividualTooltips}
              metrics={metrics}
            />
          )}
        />

        <Legend
          layout={isTablet ? 'horizontal' : 'vertical'}
          verticalAlign={isTablet ? 'bottom' : 'top'}
          align={isTablet ? 'center' : 'right'}
          wrapperStyle={{
            backgroundColor: isTablet ? 'transparent' : '#0d2872',
            borderRadius: 8,
            padding: 16,
            marginTop: isTablet ? 16 : 0,
            cursor: useIndividualTooltips ? 'pointer' : 'default',
          }}
          formatter={(v: string) => metricLabels[v] ?? v}
          onMouseEnter={e =>
            useIndividualTooltips && e?.value && setHoveredLine(e.value)
          }
          onMouseLeave={() => useIndividualTooltips && setHoveredLine(null)}
        />

        {metrics.map((metric, i) => (
          <Line
            key={metric}
            type='monotone'
            dataKey={metric}
            stroke={COLORS[i % COLORS.length]}
            strokeWidth={2}
            dot={false}
            opacity={getOpacity(metric)}
            activeDot={
              useIndividualTooltips
                ? hoveredLine === metric
                  ? { r: 5 }
                  : false
                : { r: 5 }
            }
            onMouseEnter={() => useIndividualTooltips && setHoveredLine(metric)}
            onMouseLeave={() => useIndividualTooltips && setHoveredLine(null)}
            style={{
              cursor: useIndividualTooltips ? 'pointer' : 'default',
            }}
          />
        ))}

        {useIndividualTooltips &&
          metrics.map(metric => (
            <Line
              key={`${metric}-hover`}
              type='monotone'
              dataKey={`hover-${metric}`}
              stroke='transparent'
              strokeWidth={15}
              dot={false}
              activeDot={false}
              onMouseEnter={() => setHoveredLine(metric)}
              onMouseLeave={() => setHoveredLine(null)}
              style={{ cursor: 'pointer' }}
              legendType='none'
            />
          ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
