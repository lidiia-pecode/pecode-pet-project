import { COLORS } from "@/components/weather/constants";

export const getMetricColor = (metric: string, metrics: string[]) => {
  const idx = metrics.indexOf(metric);
  return COLORS[idx >= 0 ? idx % COLORS.length : 0];
};
