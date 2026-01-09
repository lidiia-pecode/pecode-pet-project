'use client'
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

import { MAX_POINTS, WS_URL } from '@/lib/utils/market-dashboard/constants';
import { useGlobalStore } from '@/store/globalStore';

interface OhlcEntry {
  symbol: string;
  volume: number;
  interval_begin: string;
}

export interface RechartsPoint {
  time: string;
  [symbol: string]: number | string | null;
}

export function useVolumes(
  symbols: string[],
  interval: number
): RechartsPoint[] {
  const setError = useGlobalStore(state => state.setError);
  const [data, setData] = useState<RechartsPoint[]>([]);

  const wsRef = useRef<WebSocket | null>(null);

  const bufferRef = useRef<Record<string, Record<string, number>>>({});

const normalize = useCallback((): RechartsPoint[] => {
  return Object.keys(bufferRef.current)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .slice(-MAX_POINTS)
    .map(time => ({
      time,
      ...bufferRef.current[time],
    }));
}, []);


  useEffect(() => {
    bufferRef.current = {};

    if (!symbols.length) return;

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          method: 'subscribe',
          params: {
            channel: 'ohlc',
            symbol: symbols,
            interval,
          },
        })
      );
    };

    ws.onmessage = event => {
      const msg = JSON.parse(event.data);
      if (msg.success === false) {
        setError(msg.error);
        return;
      }
      if (msg.channel !== 'ohlc' || !Array.isArray(msg.data)) return;

      console.log(msg.data)

      msg.data.forEach((entry: OhlcEntry) => {
        const time = entry.interval_begin;

        bufferRef.current[time] ??= {};
        bufferRef.current[time][entry.symbol] = entry.volume;
      });

      const res = normalize();
      setData(res);
    };

    return () => ws.close();
  }, [symbols, interval, normalize, setError]);

  return useMemo(() => (symbols.length ? data : []), [symbols.length, data]);
}
