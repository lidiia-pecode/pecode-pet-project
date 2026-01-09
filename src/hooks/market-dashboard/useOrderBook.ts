import { useEffect, useRef, useState, useCallback } from 'react';

import {
  OrderBook,
  OrderBookEntry,
  WSBookEntry,
} from '@/types/MarketDashboard';

import { WS_URL } from '@/lib/utils/market-dashboard/constants';
import { useGlobalStore } from '@/store/globalStore';

export const useOrderBook = (symbol: string, depth = 10) => {
  const setError = useGlobalStore(state => state.setError);
  const wsRef = useRef<WebSocket | null>(null);

  const [book, setBook] = useState<OrderBook>({ bids: [], asks: [] });

  const updateBookSide = useCallback(
    (
      side: 'bids' | 'asks',
      updates: { price: number; qty: number }[],
      ts: string
    ) => {
      setBook(prev => {
        const newSide = [...prev[side]];
        updates.forEach(u => {
          const index = newSide.findIndex(e => e.price === u.price);
          if (u.qty === 0) {
            if (index !== -1) newSide.splice(index, 1);
          } else {
            const entry: OrderBookEntry = {
              price: u.price,
              volume: u.qty,
              timestamp: new Date(ts).getTime(),
            };
            if (index !== -1) newSide[index] = entry;
            else newSide.push(entry);
          }
        });

        const sorted =
          side === 'bids'
            ? newSide.sort((a, b) => b.price - a.price)
            : newSide.sort((a, b) => a.price - b.price);

        return { ...prev, [side]: sorted.slice(0, depth) };
      });
    },
    [depth]
  );

  useEffect(() => {
    if (!symbol) return;

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          method: 'subscribe',
          params: {
            channel: 'book',
            symbol: [symbol],
            depth,
          },
        })
      );
    };

    ws.onmessage = event => {
      try {
        const msg = JSON.parse(event.data);

        if (msg.error) {
          setError(msg.error);
          return;
        }

        if (msg.channel === 'book' && Array.isArray(msg.data)) {
          msg.data.forEach((entry: WSBookEntry) => {
            const ts = entry.timestamp;
            if (entry.bids) updateBookSide('bids', entry.bids, ts);
            if (entry.asks) updateBookSide('asks', entry.asks, ts);
          });
        }
      } catch (err) {
        console.error('Order book parse error:', err);
        setError('Failed to parse order book message');
      }
    };

    ws.onerror = err => console.error('WebSocket error', err);
    ws.onclose = () => (wsRef.current = null);

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [symbol, depth, setError, updateBookSide]);

  return book;
};
