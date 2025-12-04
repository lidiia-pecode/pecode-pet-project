'use client';

import dayjs from 'dayjs';
import { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { HourlyData, HourlyMetric, metricLabels } from '@/types/Weather';
import { useResponsive } from '@/hooks/ui/useResponsive';
import { getMetricColor } from '../../constants';
import { CustomTooltip } from './CustomTooltip';

interface ChartRendererProps {
  data: HourlyData;
  metrics: HourlyMetric[];
}

export const ChartRenderer = ({ data, metrics }: ChartRendererProps) => {
  const { isTablet } = useResponsive();
  const [hoveredMetric, setHoveredMetric] = useState<HourlyMetric | null>(null);
  const useIndividualTooltips = metrics.length > 5;

  const chartData = useMemo(
    () =>
      data.time.map((time, idx) => {
        const point: Record<string, string | number> = { time };
        metrics.forEach(metric => {
          const value = data[metric]?.[idx];
          if (value != null) point[metric] = value;
        });
        return point;
      }),
    [data, metrics]
  );

  const xAxisTicks = useMemo(() => {
    const uniqueDays = new Map<string, string | number>();
    chartData.forEach(point => {
      const day = dayjs(point.time).format('YYYY-MM-DD');
      if (!uniqueDays.has(day)) uniqueDays.set(day, point.time);
    });
    return Array.from(uniqueDays.values());
  }, [chartData]);

  const getOpacity = (metric: HourlyMetric) => {
    if (!useIndividualTooltips) return 1;
    return hoveredMetric ? (hoveredMetric === metric ? 1 : 0.35) : 0.5;
  };

  return (
    <ResponsiveContainer width='100%' height={380}>
      <LineChart
        data={chartData}
        margin={
          isTablet
            ? { top: 10, right: 0, left: 0, bottom: 10 }
            : { top: 10, right: 20, left: 0, bottom: 10 }
        }
      >
        <XAxis
          dataKey='time'
          ticks={xAxisTicks}
          tickFormatter={t => dayjs(t).format('D MMM')}
          tick={{ fontSize: 12, fill: '#1e3a8a' }}
          stroke='#1e3a8a'
        />
        <YAxis tick={{ fontSize: 12, fill: '#1e3a8a' }} stroke='#1e3a8a' />

        <Tooltip
          cursor={!useIndividualTooltips}
          active={useIndividualTooltips ? !!hoveredMetric : undefined}
          content={props => (
            <CustomTooltip
              {...props}
              metrics={metrics}
              hoveredMetric={hoveredMetric}
              useIndividualTooltips={useIndividualTooltips}
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
            padding: isTablet ? 0 : 16,
            marginTop: isTablet ? 16 : 0,
            cursor: useIndividualTooltips ? 'pointer' : 'default',
          }}
          formatter={v => metricLabels[v] ?? v}
          onMouseEnter={e =>
            useIndividualTooltips &&
            e?.value &&
            setHoveredMetric(e.value as HourlyMetric)
          }
          onMouseLeave={() => useIndividualTooltips && setHoveredMetric(null)}
        />

        {metrics.map(metric => (
          <Line
            key={metric}
            type='monotone'
            dataKey={metric}
            stroke={getMetricColor(metric, metrics)}
            strokeWidth={2}
            dot={false}
            opacity={getOpacity(metric)}
            activeDot={
              useIndividualTooltips
                ? hoveredMetric === metric
                  ? { r: 5 }
                  : false
                : { r: 5 }
            }
            onMouseEnter={() =>
              useIndividualTooltips && setHoveredMetric(metric)
            }
            onMouseLeave={() => useIndividualTooltips && setHoveredMetric(null)}
            style={{ cursor: useIndividualTooltips ? 'pointer' : 'default' }}
          />
        ))}


      </LineChart>
    </ResponsiveContainer>
  );
};
