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
          className="forecast bg-transparent_black p-4 pt-2 mb-2 rounded-md"
          key={index}
          onClick={() => hideOrShow(index)}
        >
          <div className="flex flex-row items-center font-medium">
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
          <div className="forecast-hourly overflow-scroll">
            <p className="font-medium mb-2">Hourly forecast</p>
            <div className="flex">
              {forecastDay.hour.map((hour, i) => {
                var epochTimestamp = hour.time_epoch;
                var date = new Date(epochTimestamp * 1000);

                return (
                  <div className="w-12 text-center flex-none" key={i}>
                    <p className="text-sm">{Math.round(hour.temp_c)}°</p>
                    <img src={hour.condition.icon} alt={hour.condition.text} />
                    <p className="text-sm">
                      {strftime("%l%P", new Date(date))}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="forecast-details"></div>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
