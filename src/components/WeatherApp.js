import { useState, useEffect } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;

const generateWeatherUrl = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

const WeatherApp = (props) => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // if (!data) return;
    const weatherData = data ? data : {};
    // const weatherData = data;

    if (props.getData) props.getData(weatherData);
  }, [props, data]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Fetching weather data for ", city);

    try {
      setIsLoading(true);

      if (!city) throw new Error("Please enter a valid city name!");

      const response = await fetch(generateWeatherUrl(city));
      const responseData = await response.json();
      console.log(responseData);

      if (responseData.cod === "404") throw new Error(responseData.message);

      setError(null);
      setData(responseData);
    } catch (error) {
      setError(error);
      setData(null);
    } finally {
      setIsLoading(false);
      setCity("");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="search">
          <input
            type="text"
            className="input-search"
            placeholder="Enter a city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <button className="btn btn-search" type="submit">
          Search
        </button>

        {isLoading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
        {data && (
          <div>
            <h1>
              {data.name}, {data.sys.country}
            </h1>
            <p>{new Date((data.dt + data.timezone) * 1000).toUTCString()}</p>

            <h1>{Math.round(data.main.temp)}°C</h1>
            <p>feels like {Math.round(data.main.feels_like)}°C</p>
            <img
              className="img-weather"
              src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              alt={`${data.weather[0].description} icon`}
            />
            <h3>{data.weather[0].description.toUpperCase()}</h3>
          </div>
        )}
      </form>
    </>
  );
};

export default WeatherApp;
