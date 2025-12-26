'use client';

import { useState } from 'react';
import { Box, Typography, Divider, Paper } from '@mui/material';
import { History, ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { AnimatePresence, motion } from 'framer-motion';

import { styles } from './LocationHistoryList.styles';
import { LocationData } from '@/types/Weather';
import { useWeatherStore } from '@/store/weatherStore';
import { formatCoordinates } from '@/lib/utils/weather/location';

export const LocationHistoryList = ({ onSelect }: { onSelect: () => void }) => {
  const locationHistory = useWeatherStore(state => state.locationHistory);
  const clearHistory = useWeatherStore(state => state.clearHistory);
  const setLocation = useWeatherStore(state => state.setLocation);

  const DEFAULT_VISIBLE = 4;
  const [visibleCount, setVisibleCount] = useState(DEFAULT_VISIBLE);

  const total = locationHistory.length;
  const allShown = visibleCount >= total;

  const handleLoadPrevious = () =>
    setVisibleCount(prev => Math.min(prev + DEFAULT_VISIBLE, total));
  const handleShowRecent = () => setVisibleCount(DEFAULT_VISIBLE);
  const handleSelect = (loc: LocationData) => {
    setLocation(loc);
    onSelect();
  };

  const visibleLocations = locationHistory.slice(-visibleCount);
  if (!total) return null;

  return (
    <Paper elevation={1} sx={styles.root}>
      <Box sx={styles.header}>
        <Box sx={styles.headerTitle}>
          <History fontSize='small' sx={styles.titleHistory} />
          <Typography variant='subtitle2' sx={styles.titleText}>
            Recent locations
          </Typography>
        </Box>

        <Box onClick={clearHistory} sx={styles.clearButton}>
          <Typography variant='subtitle2'>Clear history</Typography>
        </Box>
      </Box>

      <Box sx={styles.listContainer}>
        {total > DEFAULT_VISIBLE && (
          <Box
            sx={styles.loadMoreButton}
            onClick={allShown ? handleShowRecent : handleLoadPrevious}
          >
            <Typography variant='caption'>
              {allShown ? 'Show recent' : 'Load previous'}
            </Typography>
            {allShown ? (
              <ArrowDropDown fontSize='small' />
            ) : (
              <ArrowDropUp fontSize='small' />
            )}
          </Box>
        )}

        <AnimatePresence initial={false}>
          {visibleLocations.map((loc, idx) => (
            <motion.div
              key={`${loc.lat}-${loc.lon}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{
                duration: 0.25,
                ease: [0.4, 0, 0.2, 1],
                delay: idx < DEFAULT_VISIBLE ? idx * 0.08 : 0,
              }}
            >
              <Box
                sx={styles.listItem}
                onClick={() => handleSelect(loc)}
              >
                <Typography fontSize={14}>
                  {loc.label || formatCoordinates(loc.lat, loc.lon)}
                </Typography>
              </Box>
              <Divider />
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>
    </Paper>
  );
};

export default LocationHistoryList;
