import { useEffect, useRef, useState } from 'react';

import { MAX_POINTS, WS_URL } from '@/lib/utils/market-dashboard/constants';
import { useGlobalStore } from '@/store/globalStore';
import { OHLC } from '@/types/MarketDashboard';

export const useOHLC = (symbol: string, interval = 1) => {
  const setError = useGlobalStore(state => state.setError);

  const wsRef = useRef<WebSocket | null>(null);
  const [candles, setCandles] = useState<OHLC[]>([]);

  useEffect(() => {
    if (!symbol) return;

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          method: 'subscribe',
          params: {
            channel: 'ohlc',
            symbol: [symbol],
            interval,
          },
        })
      );
    };

    ws.onmessage = event => {
      try {
        const msg = JSON.parse(event.data);

        console.log(msg);
        if (msg.error) {
          setError(msg.error)
        }

        if (msg.channel === 'ohlc' && Array.isArray(msg.data)) {
          setCandles(prev => {
            const map = new Map(prev.map(c => [c.interval_begin, c]));

            msg.data.forEach((c: OHLC) => {
              map.set(c.interval_begin, {
                interval_begin: c.interval_begin,
                open: c.open,
                high: c.high,
                low: c.low,
                close: c.close,
                volume: c.volume,
              });
            });

            const sorted = Array.from(map.values()).sort((a, b) =>
              a.interval_begin.localeCompare(b.interval_begin)
            );

            return sorted.slice(-MAX_POINTS);
          });
        }
      } catch (err) {
        console.error('Failed to parse WS message', err);
      }
    };

    ws.onerror = err => console.error('WebSocket error', err);
    ws.onclose = () => {
      wsRef.current = null;
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [symbol, interval, setError]);

  return candles;
};
