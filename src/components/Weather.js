import React, { useState, useEffect } from "react";
import LocationSearch from "./LocationSearch";
import Forecast from "./Forecast";
import { FaLocationDot } from "react-icons/fa6";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  // const [searchLocation, setSearchLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (location) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=6665e08023e147aeacb104104241801&q=${location}`
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

  useEffect(() => {
    // Fetch data on initial mount with a default location or use a default location of choice
    fetchData("auto:ip");
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
      <div className="">
        <LocationSearch
          fetchData={fetchData}
          setLoading={setLoading}
          currentLocation={weatherData.location.name}
        />
        <div className="grid grid-cols-2 gap-4">
          <div className="text-left px-2 mt-10">
            <p className="font-medium mb-2">Now</p>
            <div className="mb-1">
              <h1 className="text-6xl inline-block align-middle font-medium">
                {weatherData.current.temp_c}°
              </h1>
              <img
                className="inline-block relative top-2.5 left-0"
                src={weatherData.current.condition.icon}
                alt={weatherData.current.condition.text}
              />
            </div>
            <p className="text-sm leading-tight">
              Last Updated
              <br />
              {weatherData.current.last_updated}
            </p>
          </div>
          <div className="text-right px-2 mt-10">
            <p className="font-medium mb-1">
              {weatherData.current.condition.text}
            </p>
            <p className="text-sm">
              Feels like {weatherData.current.feelslike_c}°
            </p>
            <div>
              <p className="inline-block align-middle mr-1">
                <FaLocationDot />
              </p>
              <p className="inline-block align-middle mt-0.5">
                {weatherData.location.name}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 md:mt-0 text-left">
        <p className="text-3xl font-medium mb-4">7-Day Forecast</p>
        <Forecast
          key={weatherData.location.name}
          location={weatherData.location.name}
        />
      </div>
    </div>
  );
};

export default Weather;
