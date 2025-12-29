'use client';

import { useState } from 'react';
import {
  IconButton,
  Paper,
  Typography,
  Fade,
  Box,
  ClickAwayListener,
  CircularProgress,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Popper from '@mui/material/Popper';

import { styles } from './WeatherAdvice.styles';
import { useCurrentWeatherQuery } from '@/hooks/weather/useCurrentWeather';
import { getWeatherAdvice } from '@/lib/api/weather';


export const WeatherAdvice = () => {
  const { data } = useCurrentWeatherQuery();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [advice, setAdvice] = useState<string | null>(null);

  const open = Boolean(anchorEl);

  const togglePopper = async (e: React.MouseEvent<HTMLElement>) => {
    if (open) return setAnchorEl(null);

    setAnchorEl(e.currentTarget);

    if (!advice && data) {
      try {
        setAdvice(await getWeatherAdvice(data));
      } catch {
        setAdvice('Error fetching advice');
      }
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <IconButton onClick={togglePopper} sx={styles.button}>
        <InfoOutlinedIcon />
      </IconButton>

      <Popper
        open={open}
        anchorEl={anchorEl}
        placement='top-start'
        transition
        disablePortal
        modifiers={[
          { name: 'offset', options: { offset: [0, 6] } },
          {
            name: 'preventOverflow',
            options: { boundary: 'clippingParents', padding: 16 },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <Fade {...TransitionProps} timeout={150}>
              <Paper sx={styles.popperPaper}>
                {advice ? (
                  <Typography variant='body1'>{advice}</Typography>
                ) : (
                  <Box sx={styles.loadingBox}>
                    <Typography variant='body1'>Loading advice…</Typography>
                    <CircularProgress size={20} />
                  </Box>
                )}
              </Paper>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </Box>
  );
}
