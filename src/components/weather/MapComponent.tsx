'use client';
import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface MapComponentProps {
  selected?: { lat: number; lon: number };
  initialCenter: [number, number];
  initialZoom: number;
  onClick?: (lat: number, lon: number) => void;
}

export default function MapComponent({
  selected,
  initialCenter,
  initialZoom,
  onClick,
}: MapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style:
        'https://api.maptiler.com/maps/base-v4/style.json?key=sdgjgQYux7lFdUtCFmcU',
      center: initialCenter,
      zoom: initialZoom,
    });
    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    if (onClick) {
      mapRef.current.on('click', e => onClick(e.lngLat.lat, e.lngLat.lng));
    }
  }, [initialCenter, initialZoom, onClick]);

  useEffect(() => {
    if (!mapRef.current) return;

    if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }

    if (selected) {
      const el = document.createElement('div');
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.background = '#1976d2';
      el.style.borderRadius = '50%';
      el.style.boxShadow = '0 0 0 6px rgba(25,118,210,0.35)';
      el.style.border = '2px solid white';

      const marker = new maplibregl.Marker(el)
        .setLngLat([selected.lon, selected.lat])
        .addTo(mapRef.current!);
      markerRef.current = marker;

      mapRef.current.flyTo({ center: [selected.lon, selected.lat], zoom: 13 });
    }
  }, [selected]);

  return (
    <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
  );
}
