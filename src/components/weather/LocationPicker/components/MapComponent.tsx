'use client';

import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { LocationData } from '@/types/Weather';
import { MAP_CONFIG } from '../../constants';

interface MapComponentProps {
  selected?: LocationData | null;
  onClick?: (lat: number, lon: number) => void;
}

const createMarkerElement = (): HTMLDivElement => {
  const el = document.createElement('div');
  Object.assign(el.style, {
    width: '20px',
    height: '20px',
    background: '#1976d2',
    borderRadius: '50%',
    boxShadow: '0 0 0 6px rgba(25,118,210,0.35)',
    border: '2px solid white',
    cursor: 'pointer',
  });
  return el;
};

export default function MapComponent({ selected, onClick }: MapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: MAP_CONFIG.STYLE_URL,
      center: MAP_CONFIG.DEFAULT_CENTER,
      zoom: MAP_CONFIG.DEFAULT_ZOOM,
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !onClick) return;

    const handleClick = (e: maplibregl.MapMouseEvent) => {
      onClick(e.lngLat.lat, e.lngLat.lng);
    };

    map.on('click', handleClick);
    return () => {
      map.off('click', handleClick);
    };
  }, [onClick]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }

    if (selected) {
      const marker = new maplibregl.Marker(createMarkerElement())
        .setLngLat([selected.lon, selected.lat])
        .addTo(map);

      markerRef.current = marker;

      map.flyTo({
        center: [selected.lon, selected.lat],
        zoom: MAP_CONFIG.SELECTED_ZOOM,
        duration: 2000,
      });
    }
  }, [selected]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    />
  );
}
