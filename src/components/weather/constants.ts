export const COLORS = [
  '#ff69b4',
  '#ff0080',
  '#3b82f6',
  '#a855f7',
  '#ff6f61',
  '#26ced1',
  '#ffd500',
  '#ff6347',
  '#f754e3',
  '#c4ff00',
  '#ffa18d',
  '#f3ff50',
] as const;

export const getMetricColor = (metric: string, metrics: string[]) => {
  const idx = metrics.indexOf(metric);
  return COLORS[idx >= 0 ? idx % COLORS.length : 0];
};

export const MAP_CONFIG = {
  STYLE_URL:
    'https://api.maptiler.com/maps/base-v4/style.json?key=sdgjgQYux7lFdUtCFmcU',
  DEFAULT_CENTER: [50.45, 30.52] as [number, number],
  DEFAULT_ZOOM: 4,
  SELECTED_ZOOM: 13,
  SEARCH_DEBOUNCE: 300,
  SEARCH_LIMIT: 6,
} as const;


export const DEFAULT_LOCATION = {
  title: 'Kyiv, Ukraine',
  lat: 50.4501,
  lon: 30.5234,
};



