'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  Box,
  Paper,
  TextField,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
  CircularProgress,
  Collapse,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import RoomIcon from '@mui/icons-material/Room';
import CloseIcon from '@mui/icons-material/Close';
import { useWeatherStore } from '@/store/weatherStore';

const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false });

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

interface LocationPickerProps {
  initialCenter?: [number, number];
  initialZoom?: number;
  onSelect?: (lat: number, lon: number, label?: string) => void;
}

export default function LocationPicker({
  initialCenter = [50.45, 30.52],
  initialZoom = 10,
  onSelect,
}: LocationPickerProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandMap, setExpandMap] = useState(false);
  const toggleExpandMap = () => setExpandMap(prev => !prev);
  const location = useWeatherStore(state => state.location);
  const setLocation = useWeatherStore(state => state.setLocation)
  const isLocationSelected = location != null;

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      if (!query.trim()) {
        setSuggestions([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=6`,
        { signal: controller.signal }
      )
        .then(res => res.json())
        .then((data: NominatimResult[]) => setSuggestions(data))
        .catch(err => {
          if (err.name !== 'AbortError') console.error(err);
        })
        .finally(() => setLoading(false));
    }, 300);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  const handleSuggestionClick = (item: NominatimResult) => {
    const lat = Number(item.lat);
    const lon = Number(item.lon);
    setLocation({ lat, lon, label: item.display_name });
    setQuery(item.display_name);
    setSuggestions([]);
    onSelect?.(lat, lon, item.display_name);
  };

  const clearSelection = () => {
    setLocation(null);
    setQuery('');
    setSuggestions([]);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', pb: 1 }}
        onClick={toggleExpandMap}
      >
        <RoomIcon color='primary' sx={{ mr: 1 }} />
        <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
          {isLocationSelected ? 'Change Location' : 'Choose Location'}
        </Typography>
        {isLocationSelected && (
          <Typography variant='body2' sx={{ ml: 2 }}>
            {location.label}
          </Typography>
        )}
        <IconButton
          size='small'
          sx={{
            transform: expandMap ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: '0.2s',
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </Box>

      <Collapse in={expandMap} timeout={200}>
        <>
          <Box sx={{ position: 'relative' }}>
            <TextField
              fullWidth
              size='small'
              placeholder='Enter a city or address…'
              value={query}
              onChange={e => setQuery(e.target.value)}
              variant='outlined'
              slotProps={{
                input: {
                  startAdornment: <SearchIcon sx={{ mr: 1 }} />,
                  endAdornment: (isLocationSelected || query || loading) && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {loading && (
                        <CircularProgress size={18} sx={{ mr: 0.5 }} />
                      )}
                      {(isLocationSelected || query) && (
                        <IconButton size='small' onClick={clearSelection}>
                          <CloseIcon fontSize='small' />
                        </IconButton>
                      )}
                    </Box>
                  ),
                },
              }}
            />

            {suggestions.length > 0 && (
              <Paper
                elevation={3}
                sx={{
                  position: 'absolute',
                  top: '105%',
                  left: 0,
                  right: 0,
                  zIndex: 20,
                }}
              >
                <List dense>
                  {suggestions.map(s => (
                    <ListItemButton
                      key={s.place_id}
                      onClick={() => handleSuggestionClick(s)}
                    >
                      <ListItemText
                        primary={s.display_name}
                        secondary={`${Number(s.lat).toFixed(4)}, ${Number(
                          s.lon
                        ).toFixed(4)}`}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Paper>
            )}
          </Box>

          <Box sx={{ width: '100%', height: 420 }}>
            <MapComponent
              selected={
                isLocationSelected
                  ? { lat: location.lat, lon: location.lon }
                  : undefined
              }
              initialCenter={initialCenter}
              initialZoom={initialZoom}
              onClick={(lat, lon) => {
                setLocation({ lat, lon });
                setQuery(`${lat.toFixed(5)}, ${lon.toFixed(5)}`);
                onSelect?.(lat, lon);
              }}
            />
          </Box>
        </>
      </Collapse>
    </Box>
  );
}
