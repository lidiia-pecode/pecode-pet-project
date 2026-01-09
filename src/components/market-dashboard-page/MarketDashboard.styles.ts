import { SxProps, Theme } from '@mui/material';

export const styles = {
  root: { display: 'flex', flexDirection: 'column', gap: 4 },
  chartBox: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#212248ff',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    gap: 4,
    p: 4,
  },
  chartBoxHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linechart: { backgroundColor: '#212248ff' },
  tick: { fontSize: 10, fill: '#819dd8ff' },

  candleBookChartContainer: {
    display: 'flex',
    minHeight: 760,
    position: { xs: 'relative', lg: 'static' },
  },
} satisfies Record<string, SxProps<Theme>>;
