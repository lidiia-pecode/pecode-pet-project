'use client';

import { Box, Typography, Divider } from '@mui/material';
import { History, ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { useState } from 'react';
import { useWeatherStore } from '@/store/weatherStore';
import { LocationData } from '@/types/Weather';
import { formatCoordinates } from '@/lib/utils/weather/location';
import { AnimatePresence, motion } from 'framer-motion';

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
    <Box
      sx={{
        width: 360,
        height: 460,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #ddd',
        borderRadius: 2,
        backgroundColor: 'background.paper',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          px: 1.5,
          py: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          backgroundColor: '#edf2fa',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <History fontSize='small' sx={{ opacity: 0.7 }} />
          <Typography variant='subtitle2' sx={{ fontWeight: 500 }}>
            Recent locations
          </Typography>
        </Box>

        <Box
          onClick={clearHistory}
          sx={{
            py: 1,
            cursor: 'pointer',
            borderRadius: 1,
            color: 'primary.main',
          }}
        >
          <Typography variant='subtitle2' >
            Clear history
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {total > DEFAULT_VISIBLE && (
          <Box
            sx={{
              px: 1,
              py: 0.7,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.7,
              cursor: 'pointer',
              color: 'primary.main',
              fontSize: 13,
              '&:hover': { bgcolor: 'grey.100' },
              borderBottom: '1px solid #eee',
            }}
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
                sx={{
                  px: 1.5,
                  py: 1,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'grey.100' },
                }}
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
    </Box>
  );
};

export default LocationHistoryList;
