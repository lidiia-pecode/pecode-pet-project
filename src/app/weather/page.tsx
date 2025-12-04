import { CurrentWeather } from '@/components/weather/CurrentWeather';
import { LocationPicker } from '@/components/weather/LocationPicker';
import { MetricsCheckboxList } from '@/components/weather/MetricsMultiselect';
import { WeatherChart } from '@/components/weather/WeatherChart';

export default function WeatherPage() {
  return (
    <>
      <CurrentWeather />
      
      <LocationPicker />
      
      <MetricsCheckboxList />

      <WeatherChart />
    </>
  );
}
