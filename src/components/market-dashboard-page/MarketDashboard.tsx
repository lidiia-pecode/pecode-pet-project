'use client';

import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { styles } from './MarketDashboard.styles';
import { OHLC } from '@/types/MarketDashboard';
import { useOHLC } from '@/hooks/market-dashboard/useOHLC';
import { useOrderBook } from '@/hooks/market-dashboard/useOrderBook';
import { DEFAULT_CURRENCY } from '@/lib/utils/market-dashboard/constants';

import { Alerts } from '../shared/Alerts';
import { MultiChart } from './components/MultiChart';
import { CandleChart } from './components/CandleChart';
import { CandleTooltip } from './components/CandleTooltip';
import { CurrencySelect } from './components/CurrencySelect';
import { OrderBookSidebar } from './components/OrderBookSidebar';
import { DotsLoader } from './components/DotsLoader';

type ChartCandle = OHLC & {
  timeStr: string;
};

export const MarketDashboard = () => {
  const [currency, setCurrency] = useState<string>(DEFAULT_CURRENCY);
  const candles = useOHLC(currency);
  const book = useOrderBook(currency);

  const [activeCandle, setActiveCandle] = useState<OHLC | null>(null);

  const chartData: ChartCandle[] = useMemo(
    () =>
      candles.map(c => ({
        ...c,
        timeStr: dayjs(c.interval_begin).format('DD/MM HH:mm'),
      })),
    [candles]
  );

  const candleToShow = activeCandle ?? candles[candles.length - 1] ?? null;
  const isLoading = !candles.length || !book || book.asks.length === 0;

  return (
    <Box sx={styles.root}>
      <Typography variant='h5'>
        Multi-Currency Volume Trends
      </Typography>

      <Box sx={styles.chartBox}>
        <MultiChart />
      </Box>

      <Typography variant='h5'>
        Selected Currency OHLC and Order Book (Real-Time)
      </Typography>
      <Box sx={styles.candleBookChartContainer}>
        <Box sx={styles.chartBox}>
          <Box sx={styles.chartBoxHeader}>
            <CurrencySelect currency={currency} onChange={setCurrency} />
            <CandleTooltip candle={candleToShow} />
          </Box>

          {isLoading ? (
            <DotsLoader text={`Loading chart for ${currency}`} fontSize={24} />
          ) : (
            <CandleChart
              chartData={chartData}
              setActiveCandle={setActiveCandle}
            />
          )}
        </Box>

        <OrderBookSidebar
          currency={currency}
          book={book}
          placeholder={isLoading}
        />
      </Box>

      <Alerts />
    </Box>
  );
};
