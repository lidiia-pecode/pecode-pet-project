export async function fetchNominatimReverse(
  lat: number,
  lon: number
): Promise<string | null> {
  try {
    const url = new URL('https://nominatim.openstreetmap.org/reverse');
    url.searchParams.set('format', 'json');
    url.searchParams.set('lat', String(lat));
    url.searchParams.set('lon', String(lon));

    const res = await fetch(url.toString());
    if (!res.ok) return null;

    const data = await res.json();
    return data.display_name || null;
  } catch (err) {
    console.error('Reverse geocoding failed:', err);
    throw new Error('Reverse geocoding failed');
  }
}
