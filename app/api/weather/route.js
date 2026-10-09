const openWeatherUrl = "https://api.openweathermap.org/data/2.5/weather";

export async function GET(request) {
  const city = new URL(request.url).searchParams.get("city")?.trim();

  if (!city) {
    return Response.json({ error: "Enter a city to check its weather." }, { status: 400 });
  }

  if (city.length > 80) {
    return Response.json({ error: "City names must be 80 characters or fewer." }, { status: 400 });
  }

  const apiKey = process.env.API_WEATHER_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error:
          "Weather lookup is not configured. Add API_WEATHER_KEY to the project-root .env.local file.",
      },
      { status: 503 },
    );
  }

  const url = new URL(openWeatherUrl);
  url.searchParams.set("q", city);
  url.searchParams.set("appid", apiKey);
  url.searchParams.set("units", "metric");

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    const data = await response.json();

    if (!response.ok) {
      if (response.status === 404) {
        return Response.json(
          { error: `No weather data was found for "${city}". Check the city name.` },
          { status: 404 },
        );
      }

      if (response.status === 401) {
        console.error("OpenWeather rejected the configured API key.");
        return Response.json(
          { error: "The weather service rejected its API key. Check API_WEATHER_KEY." },
          { status: 502 },
        );
      }

      if (response.status === 429) {
        return Response.json(
          { error: "The weather service is busy. Try again in a few minutes." },
          { status: 503 },
        );
      }

      console.error("OpenWeather request failed with status", response.status);
      return Response.json(
        { error: "The weather service could not complete the request. Try again later." },
        { status: 502 },
      );
    }

    const current = data.weather?.[0];
    if (
      typeof data.main?.temp !== "number" ||
      typeof data.main?.feels_like !== "number" ||
      typeof data.main?.humidity !== "number" ||
      typeof current?.description !== "string"
    ) {
      console.error("OpenWeather returned an incomplete current-weather response.");
      return Response.json(
        { error: "The weather service returned an unexpected response. Try again later." },
        { status: 502 },
      );
    }

    return Response.json({
      city: data.name,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      description: current.description,
    });
  } catch (error) {
    console.error("Unable to contact OpenWeather.", error);
    return Response.json(
      { error: "Could not reach the weather service. Check your connection and try again." },
      { status: 502 },
    );
  }
}
