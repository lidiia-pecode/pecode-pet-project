export const WS_URL = 'wss://ws.kraken.com/v2';
export const MAX_POINTS = 9;

export const INTERVALS = [
  { label: '1m', value: 1 },
  { label: '5m', value: 5 },
  { label: '30m', value: 30 },
  { label: '1h', value: 60 },
  { label: '4h', value: 240 },
  { label: '1d', value: 1440 },
  { label: '1w', value: 10080 },
  { label: '2w', value: 21600 },
] as const;


export const DEFAULT_CURRENCY = 'ETH/USD';
