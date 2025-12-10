import { LocationData } from "@/types/Weather";

export const getCountryCoordinates = async (
  countryName: string
): Promise<LocationData | null> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?country=${encodeURIComponent(
        countryName
      )}&format=json&limit=1`
    );

    const data = await response.json();
    if (data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
      };
    }
    return null;
  } catch (err) {
    console.error('Error fetching coordinates:', err);
    return null;
  }
};
