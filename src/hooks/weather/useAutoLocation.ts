import { useState, useEffect } from 'react';
import { LocationData } from '@/types/Weather';
import { fetchNominatimReverse } from '@/lib/api/weather/location';

export function useAutoLocation() {
  const [autoLocation, setAutoLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLocation = async () => {
      if (!navigator.geolocation) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          }
        );

        const { latitude, longitude } = position.coords;
        const displayName = await fetchNominatimReverse(latitude, longitude);

        if (displayName) {
          setAutoLocation({
            lat: latitude,
            lon: longitude,
            label: displayName,
          });
        } else {
          setAutoLocation(null);
        }
      } catch (err) {
        console.log(err);
        setError(true);
        setAutoLocation(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  return { autoLocation, loading, error };
}
