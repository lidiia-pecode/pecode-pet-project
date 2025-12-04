interface WeatherIconContent {
  path: string;
  description: string;
}

export function getCurrentWeatherInfo(code: number): WeatherIconContent {
  switch (code) {
    case 0:
      return { path: '/weather/clear_sky.png', description: 'Clear Sky' };
    case 1:
    case 2:
      return { path: '/weather/partly_cloudy.png', description: 'Partly Cloudy' };
    case 3:
      return { path: '/weather/overcast.png', description: 'Overcast' };
    case 45:
    case 48:
      return { path: '/weather/fog.png', description: 'Fog' };
    case 51:
    case 53:
    case 55:
      return { path: '/weather/drizzle.png', description: 'Drizzle' };
    case 61:
    case 63:
    case 65:
      return { path: '/weather/drizzle.png', description: 'Rain' };
    case 66:
    case 67:
      return { path: '/weather/freezing-rain.png', description: 'Freezing Rain' };
    case 71:
    case 73:
    case 75:
    case 77:
      return { path: '/weather/snow.png', description: 'Snow' };
    case 80:
    case 81:
    case 82:
      return { path: '/weather/showers.png', description: 'Rain Showers' };
    case 85:
    case 86:
      return { path: '/weather/snow.png', description: 'Snow Showers' };
    case 95:
    case 96:
    case 99:
      return { path: '/weather/thunderstorm.png', description: 'Thunderstorm' };
    default:
      return { path: 'unknown', description: 'unknown' };
  }
}