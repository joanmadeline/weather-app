import React, { useState, useEffect } from "react";
import Forecast from "./Forecast";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (location) => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=6665e08023e147aeacb104104241801&q=${location}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setWeatherData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => setSearchLocation(e.target.value);

  const handleSearch = () => {
    // You can add validation for searchLocation here if needed
    setLoading(true);
    fetchData(searchLocation);
  };

  useEffect(() => {
    // Fetch data on initial mount with a default location or use a default location of your choice
    fetchData("auto:ip");
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchLocation}
          placeholder="Enter location"
          onChange={handleInputChange}
        />
        <button type="submit">Get Weather</button>
      </form>
      <p>Location: {weatherData.location.name}</p>
      <p>Temperature: {weatherData.current.temp_c}</p>
      <p>Feels like: {weatherData.current.feelslike_c}</p>
      <Forecast
        key={weatherData.location.name}
        location={weatherData.location.name}
      />
    </div>
  );
};

export default Weather;
