const URL = "https://api.weatherapi.com/v1";
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const fetchForecastWeather = async (city) => {
  try {
    const response = await fetch(`${URL}/forecast.json?key=${apiKey}&q=${city}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid response format!");
    }

    const data = await response.json();

    if (data.error) {
      console.error("API Error:", data.error.message);
      return null;
    }
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

const fetchFutureWeekWeather = async (city) => {
  try {
    const daysToFetch = 7;
    const futureDates = [];
    for (let day = 1; day <= daysToFetch; day++) {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + day);
      futureDates.push(futureDate.toISOString().split("T")[0]);
    }

    const weatherData = await Promise.all(
      futureDates.map(async (date) => {
        const response = await fetch(
          `${URL}/forecast.json?key=${apiKey}&q=${city}&dt=${date}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response format!");
        }

        const data = await response.json();
        return data.error ? null : data;
      })
    );

    return weatherData.filter((data) => data !== null);
  } catch (error) {
    console.error("Error fetching future week weather:", error);
    return [];
  }
};

export { fetchForecastWeather, fetchFutureWeekWeather };
