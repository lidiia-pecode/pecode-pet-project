'use client';

import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { LocationData } from '@/types/Weather';
import { MAP_CONFIG } from '../../../../constants';
import { styles } from './MapComponent.styles';

interface MapComponentProps {
  selected?: LocationData | null;
  setShowSuggestions: Dispatch<SetStateAction<boolean>>;
  onClick?: (lat: number, lon: number) => void;
}

const createMarkerElement = (): HTMLDivElement => {
  const el = document.createElement('div');
  Object.assign(el.style, styles.marker);
  return el;
};

export default function MapComponent({
  selected,
  setShowSuggestions,
  onClick,
}: MapComponentProps) {
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
      setShowSuggestions(true);
    };

    map.on('click', handleClick);
    return () => {
      map.off('click', handleClick);
    };
  }, [onClick, setShowSuggestions]);

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

  return <div ref={mapContainerRef} style={styles.container} />;
}
