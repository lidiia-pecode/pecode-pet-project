'use client';

import dayjs from 'dayjs';

import { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { styles } from './MultiChart.styles';

import {
  DEFAULT_CURRENCY,
  INTERVALS,
} from '@/lib/utils/market-dashboard/constants';
import { COLORS } from '@/lib/utils/weather/constants';
import { useVolumes } from '@/hooks/market-dashboard/useVolumes';

import { CurrencyMultiSelect } from '../CurrencyMultiSelect';
import { IntervalSelector } from '../IntervalSelector';
import { DotsLoader } from '../DotsLoader';

export const MultiChart = () => {
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([
    DEFAULT_CURRENCY,
  ]);
  const [interval, setInterval] = useState<number>(INTERVALS[0].value);

  const data = useVolumes(selectedCurrencies, interval);

  const symbolColorMap = useMemo(() => {
    const map: Record<string, string> = {};
    selectedCurrencies.forEach((curr, index) => {
      map[curr] = COLORS[index % COLORS.length];
    });
    return map;
  }, [selectedCurrencies]);

  if (!data.length) {
    return (
      <Box sx={styles.loaderWrapper}>
        <DotsLoader text='Loading chart' fontSize={24} />
      </Box>
    );
  }

  return (
    <>
      <Box sx={styles.header}>
        <CurrencyMultiSelect
          selected={selectedCurrencies}
          onChange={setSelectedCurrencies}
        />
        <IntervalSelector interval={interval} setInterval={setInterval} />
      </Box>

      <ResponsiveContainer width='100%' height={400}>
        <LineChart data={data} style={styles.linechart}>
          <XAxis
            dataKey='time'
            tickFormatter={time => dayjs(time).format('DD/MM HH:mm')}
            tick={styles.tick}
            interval='preserveStartEnd'
          />
          <YAxis tick={styles.tick} />
          <Tooltip
            labelFormatter={time => dayjs(time).format('DD/MM/YYYY HH:mm:ss')}
          />
          <Legend />
          {selectedCurrencies.map(curr => (
            <Line
              key={curr}
              type='monotone'
              dataKey={curr}
              stroke={symbolColorMap[curr]}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
