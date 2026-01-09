import { memo } from 'react';
import {
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
} from 'recharts';

import { styles } from './ChartCandle.styles';
import { ChartCandle } from '@/types/MarketDashboard';


interface CandleChartProps {
  chartData: ChartCandle[];
  setActiveCandle: (candle: ChartCandle | null) => void;
}

const CandleChartComponent = ({
  chartData,
  setActiveCandle,
}: CandleChartProps) => {


  return (
    <ResponsiveContainer width='100%' height={400}>
      <LineChart
        data={chartData}
        margin={{ top: 20, right: 40, left: 0, bottom: 20 }}
        onMouseMove={state => {
          if (state?.activeTooltipIndex != null) {
            setActiveCandle(chartData[state.activeTooltipIndex as number]);
          }
        }}
        onMouseLeave={() => setActiveCandle(null)}
      >
        <XAxis dataKey='timeStr' tick={styles.tick} />
        <YAxis tick={styles.tick} domain={['auto', 'auto']} />

        <Tooltip content={() => null} wrapperStyle={{ display: 'none' }} />

        <Line
          type='monotone'
          dataKey='close'
          stroke='#3b82f6'
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const CandleChart = memo(CandleChartComponent);
