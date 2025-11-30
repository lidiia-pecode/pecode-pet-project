import { LocationData, NominatimResult } from "@/types/Weather";

export const formatCoordinates = (lat: number, lon: number): string =>
  `${lat.toFixed(4)}, ${lon.toFixed(4)}`;

export const parseNominatim = (item: NominatimResult): LocationData => ({
  lat: Number(item.lat),
  lon: Number(item.lon),
  label: item.display_name,
});
