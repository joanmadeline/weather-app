import React, { useState, useEffect } from "react";

const Forecast = ({ location }) => {
  const [forecastWeather, setforecastWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (location) => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=6665e08023e147aeacb104104241801&q=${location}&days=7`
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
      <p>Weather Forecast</p>
      <p>{forecastWeather.location.name}</p>
      {forecastWeather.forecast.forecastday.map((forecastDay) => {
        return (
          <p>
            {forecastDay.date}: {forecastDay.day.avgtemp_c}°C
          </p>
        );
      })}
    </div>
  );
};

export default Forecast;
