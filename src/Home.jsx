import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-solid-svg-icons";
import { faTemperatureThreeQuarters } from "@fortawesome/free-solid-svg-icons";
import WeatherCast from "./WeatherCast";
import { useState, useEffect } from "react";
import CityFormContainer from "./CityFormContainer";
import { fetchForecastWeather, fetchFutureWeekWeather } from "./weatherService";

function Home() {
  const [city, setCity] = useState("itahari");
  const [todayWeather, setTodayWeathers] = useState(null);
  const [futureWeather, setFutureWeather] = useState([]);

  const getWeatherData = async () => {
    const weatherData = await fetchForecastWeather(city);
    setTodayWeathers(weatherData);
  };
  const getFutureWeather = async () => {
    const data = await fetchFutureWeekWeather(city);
    setFutureWeather(data);
  };

  const formatDate = (datetime) => {
    if (!datetime) return "N/A";
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(datetime).toLocaleDateString("en-GB", options);
  };

  const localTime = (datetime) => {
    if (!datetime) return "N/A";
    const basetime = datetime.split(" ")[1];
    return basetime.concat(
      " ",
      new Date(datetime).getHours() >= 12 ? "PM" : "AM"
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      getWeatherData();
      getFutureWeather();
    }
  };
  useEffect(() => {
    getWeatherData();
    getFutureWeather();
  }, []);

  return (
    <>
      <div className="h-screen w-screen bg-amber-600 flex flex-col  ">
        <CityFormContainer
          city={city}
          setCity={setCity}
          handleSubmit={handleSubmit}
        />

        <div className="text-white m-3">
          {todayWeather ? (
            <>
              <div className="mt-3 flex justify-center">
                <p className="text-white">
                  {formatDate(todayWeather?.location?.localtime)} | Local Time:{" "}
                  {localTime(todayWeather?.location?.localtime)}
                </p>
              </div>
              <p className="text-center mt-4">
                {todayWeather?.location?.name},{" "}
                {todayWeather?.location?.country}
              </p>
              <p className="text-center mt-4">
                {todayWeather?.current?.condition?.text}
              </p>
              <div className="flex justify-between items-center">
                <img
                  src={todayWeather?.current?.condition?.icon}
                  alt="Weather Icon"
                />
                <p className="text-4xl font-bold">
                  {todayWeather?.current?.temp_c}°C
                </p>
                <div>
                  <p>Real feel: {todayWeather?.current?.feelslike_c}°C</p>
                  <p>Humidity: {todayWeather?.current?.humidity}%</p>
                  <p>Wind: {todayWeather?.current?.wind_kph}Km/h</p>
                </div>
              </div>
              <div className="flex gap-4 text-white mt-4 justify-center">
                <div className="flex items-center justify-center gap-0.5">
                  <FontAwesomeIcon icon={faTemperatureThreeQuarters} />
                  <p>Pressure: {todayWeather?.current?.pressure_in}</p>
                </div>
                |
                <div className="flex items-center justify-center">
                  <p>UV: {todayWeather?.current?.uv}</p>
                </div>
                |
                <div className="flex items-center justify-center gap-0.5">
                  <FontAwesomeIcon icon={faCompass} />
                  <p>Wind Direction: {todayWeather?.current?.wind_dir}</p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-center mt-4">Loading weather data...</p>
          )}
        </div>

        <div className="text-white m-4">
          <p className="mb-2 font-bold">HOURLY FORECAST</p>
          <hr />
          <div className="flex gap-5 items-start mt-4 overflow-auto scroll-smooth forcast">
            {todayWeather?.forecast?.forecastday[0]?.hour
              ?.filter(
                (hour) =>
                  new Date(hour.time).getHours() >= new Date().getHours()
              )
              ?.map((hour, index) => (
                <WeatherCast
                  hour={hour}
                  localTime={localTime(hour.time)}
                  key={index}
                />
              ))}
          </div>
        </div>

        <div className="text-white m-4">
          <p className="mb-2 font-bold">WEEKLY FORECAST</p>
          <hr />
          <div className="flex gap-5 items-start mt-4 overflow-auto scroll-smooth">
            {futureWeather.map((weather, index) => (
              <WeatherCast
                hour={weather.forecast.forecastday[0].day}
                localTime={new Date(
                  weather.forecast.forecastday[0].date
                ).getDate()}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
