import React, { useState, useEffect } from "react";
import moment from "moment";

const Forecast = ({ location }) => {
  const [forecastWeather, setforecastWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (location) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=6665e08023e147aeacb104104241801&q=${location}&days=10`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setforecastWeather(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data on initial mount with a default location or use a default location of your choice
    fetchData(location);
  }, [location]); // Empty dependency array ensures the effect runs once after the initial render

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {forecastWeather.forecast.forecastday.map((forecastDay) => {
        return (
          <div
            key={forecastDay.date}
            className="flex flex-row items-center bg-transparent_black py-1 px-4 mb-2 rounded-md"
          >
            <div className="forecast-day">
              <p>{moment(forecastDay.date).format("dddd")}</p>
            </div>
            <div className="forecast-icon">
              <img
                className="h-10"
                src={forecastDay.day.condition.icon}
                alt={forecastDay.day.condition.text}
              />
            </div>
            <div className="forecast-temp">
              <p>
                {Math.round(forecastDay.day.maxtemp_c)}° /{" "}
                {Math.round(forecastDay.day.mintemp_c)}°
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Forecast;
