import { CurrentWeather } from './components/CurrentWeather';
import { LocationPicker } from './components/LocationPicker';
import { MetricsMultiselect } from './components/MetricsMultiselect';
import { WeatherChart } from './components/WeatherChart';

export const WeatherOverview = () => {
  return (
    <>
      <CurrentWeather />

      <LocationPicker />

      <MetricsMultiselect />

      <WeatherChart />
    </>
  );
};
