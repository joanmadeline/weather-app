import React, { useState, useEffect } from "react";
import moment from "moment";
var strftime = require("strftime");

const Forecast = ({ location }) => {
  const [forecastWeather, setForecastWeather] = useState(null);
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
      setForecastWeather(result);
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

  const hideOrShow = (e) => {
    console.log(e);
    const forecast = document.querySelectorAll(".forecast");

    if (forecast[e].classList.contains("active")) {
      forecast[e].classList.remove("active");
    } else {
      forecast.forEach((element) => {
        element.classList.remove("active");
      });
      forecast[e].classList.add("active");
    }
  };

  return (
    <div>
      {forecastWeather.forecast.forecastday.map((forecastDay, index) => (
        <div
          className="forecast bg-transparent_black px-4 py-2 mb-2 rounded-md cursor-pointer"
          key={index}
          onClick={() => hideOrShow(index)}
        >
          <div className="flex flex-row items-center justify-between font-medium">
            <div className="forecast-day">
              <p>{moment(forecastDay.date).format("dddd")}</p>
            </div>
            <div className="forecast-temp">
              <img
                className="forecast-icon h-10"
                src={forecastDay.day.condition.icon}
                alt={forecastDay.day.condition.text}
              />
              <p className="inline-block">
                {Math.round(forecastDay.day.maxtemp_c)}° /{" "}
                {Math.round(forecastDay.day.mintemp_c)}°
              </p>
            </div>
          </div>
          <div className="forecast-info py-2">
            <p className="font-medium text-sm mb-2">Hourly forecast</p>
            <div className="forecast-container hourly overflow-scroll">
              <div className="flex">
                {forecastDay.hour.map((hour, i) => {
                  var epochTimestamp = hour.time_epoch;
                  var date = new Date(epochTimestamp * 1000);

                  return (
                    <div className="w-12 text-center flex-none" key={i}>
                      <p>{Math.round(hour.temp_c)}°</p>
                      <img
                        src={hour.condition.icon}
                        alt={hour.condition.text}
                      />
                      <p>{strftime("%l%P", new Date(date))}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="forecast-conditions mt-3">
              <p className="font-medium text-sm">Daily conditions</p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="forecast-container">
                  <p className="font-medium">Max wind</p>
                  <p className="leading-none mt-2">
                    <span className="text-xl leading-none">
                      {Math.round(forecastDay.day.maxwind_kph)}
                    </span>
                    <span className="text-xs ml-1">km/h</span>
                  </p>
                </div>
                <div className="forecast-container">
                  <p className="font-medium">Average humidity</p>
                  <p className="leading-none mt-2">
                    <span className="text-xl leading-none">
                      {forecastDay.day.avghumidity}%
                    </span>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="forecast-container">
                  <p className="font-medium">Max UV index</p>
                  <p className="leading-none mt-2">
                    <span className="text-xl leading-none">
                      {forecastDay.day.uv}
                    </span>
                  </p>
                </div>
                <div className="forecast-container">
                  <p className="font-medium">Sunrise & sunset</p>
                  <p className="leading-none mt-2">
                    <span className="text-xl leading-none lowercase">
                      {forecastDay.astro.sunrise}
                    </span>
                    <br />
                    <span className="text-xs">Sunrise</span>
                  </p>
                  <p className="leading-none mt-2">
                    <span className="text-xl leading-none lowercase">
                      {forecastDay.astro.sunset}
                    </span>
                    <br />
                    <span className="text-xs">Sunset</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
