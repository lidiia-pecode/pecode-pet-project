import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const weatherData = await req.json();

    if (!weatherData) {
      return NextResponse.json({ advice: 'No weather data provided' });
    }

    const data = weatherData.data || weatherData;

    const {
      temperature_2m,
      apparent_temperature,
      relative_humidity_2m,
      wind_speed_10m,
      weather_code,
    } = data;

    const prompt = `
I have the following weather data:
- Temperature: ${temperature_2m}°C
- Feels like: ${apparent_temperature}°C
- Humidity: ${relative_humidity_2m}%
- Wind speed: ${wind_speed_10m} m/s
- Weather code: ${weather_code}


Please provide a short, friendly advice for a user based on this current weather.
`;
    const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      }),
    });

    const result = await res.json();
    console.log('Gemini response:', JSON.stringify(result, null, 2));

    const advice =
      result.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      'No advice from Gemini';

    return NextResponse.json({ advice });
  } catch (err) {
    console.error('Error in /api/weather (Gemini):', err);
    return NextResponse.json({ advice: 'Error fetching advice' });
  }
}
