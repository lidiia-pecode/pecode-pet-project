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
import { useCurrentWeatherQuery } from '@/hooks/weather/useCurrentWeather';
import { getWeatherAdvice } from '@/lib/api/weather/weather';

export default function WeatherAdvice() {
  const { data } = useCurrentWeatherQuery();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const [advice, setAdvice] = useState<string | null>(null);

  const handleClick = async (e: React.MouseEvent<HTMLElement>) => {
    if (open) {
      setAnchorEl(null);
      return;
    }

    setAnchorEl(e.currentTarget);

    if (!advice && data) {
      try {
        const text = await getWeatherAdvice(data);
        setAdvice(text);
      } catch {
        setAdvice('Error fetching advice');
      }
    }
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <Box sx={{ position: 'absolute', bottom: 16, right: 8 }}>
      <IconButton
        onClick={handleClick}
        sx={{
          borderRadius: '50%',
          color: '#6c81ce',
        }}
      >
        <InfoOutlinedIcon />
      </IconButton>

      <Popper
        open={open}
        anchorEl={anchorEl}
        placement='top-start'
        transition
        modifiers={[
          {
            name: 'offset',
            options: { offset: [0, 8] },
          },
          {
            name: 'preventOverflow',
            options: {
              padding: 8,
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Fade {...TransitionProps} timeout={150}>
              <Paper
                sx={{
                  p: 2,
                  maxWidth: 300,
                  borderRadius: 2,
                  background: '#fff',
                  boxShadow: '0 0 20px #0004',
                  position: 'relative',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    bottom: -12,
                    right: 20,
                    borderLeft: '10px solid transparent',
                    borderRight: '10px solid transparent',
                    borderTop: '12px solid #fff',
                  },
                }}
              >
                {
                  advice ? (
                    <Typography variant='body1'>{advice}</Typography>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant='body1'>Loading advice…</Typography>
                      <CircularProgress size={20} />
                    </Box>
                  )
                }
              </Paper>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </Box>
  );
}
