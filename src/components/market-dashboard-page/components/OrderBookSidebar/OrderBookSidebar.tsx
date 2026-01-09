import { Box, Typography } from '@mui/material';

import { styles } from './OrderBookSidebar.styles';
import { OrderBook } from '@/types/MarketDashboard';
import { DotsLoader } from '../DotsLoader';

interface OrderBookSidebarProps {
  currency: string;
  book: OrderBook;
  placeholder?: boolean;
}

export const OrderBookSidebar = ({
  currency,
  book,
  placeholder,
}: OrderBookSidebarProps) => {
if (placeholder || !currency) {
  return (
    <Box sx={styles.loaderBox}>
      <DotsLoader
        text={`Loading order book...`}
        fontSize={18}
        color='#6500d8'
      />
    </Box>
  );
}

  const bestAsk = book.asks[0];
  const bestBid = book.bids[0];

  return (
    <Box sx={styles.rootBox}>
      <Typography sx={styles.rootTitle}>Order Book — {currency}</Typography>

      {/* Asks */}
      <Typography sx={styles.asksTitle}>
        Asks
      </Typography>
      <Box sx={styles.titlesRow}>
        <Typography sx={styles.titleCell}>Price</Typography>
        <Typography sx={styles.titleCell}>Volume</Typography>
      </Box>
      {book.asks.map(a => {
        const isBest = bestAsk?.price === a.price;
        return (
          <Box
            key={a.price}
            sx={[styles.valueRow, isBest && styles.bestAskRow]}
          >
            <Typography sx={[styles.askCell, isBest && styles.bestCell]}>
              {a.price.toFixed(4)}
            </Typography>
            <Typography sx={[styles.askCell, isBest && styles.bestCell]}>
              {a.volume.toFixed(4)}
            </Typography>
          </Box>
        );
      })}

      {/* Bids */}
      <Typography sx={styles.bidsTitle}>
        Bids
      </Typography>
      <Box sx={styles.titlesRow}>
        <Typography sx={styles.titleCell}>Price</Typography>
        <Typography sx={styles.titleCell}>Volume</Typography>
      </Box>
      {book.bids.map(b => {
        const isBest = bestBid?.price === b.price;
        return (
          <Box
            key={b.price}
            sx={[styles.valueRow, isBest && styles.bestBidRow]}
          >
            <Typography sx={[styles.bidCell, isBest && styles.bestCell]}>
              {b.price.toFixed(4)}
            </Typography>
            <Typography sx={[styles.bidCell, isBest && styles.bestCell]}>
              {b.volume.toFixed(4)}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};
