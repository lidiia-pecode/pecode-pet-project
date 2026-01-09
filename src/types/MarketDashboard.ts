// CANDLE ENTITIES

export interface OHLC {
  interval_begin: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type ChartCandle = OHLC & {
  timeStr: string;
};

// BOOK ENTITIES

export interface OrderBookEntry {
  price: number;
  volume: number;
  timestamp: number;
}

export interface OrderBook {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
}

export interface WSBookEntry {
  symbol: string;
  bids?: { price: number; qty: number }[];
  asks?: { price: number; qty: number }[];
  checksum?: number;
  timestamp: string;
}
