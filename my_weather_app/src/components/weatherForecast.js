import React, { useState, useEffect } from "react";
import axios from "axios";

function WeatherForecast({ data }) {
  const FORE_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const foreUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.city.lat}&lon=${data.city.lon}&cnt=9&appid=${FORE_API_KEY}&units=metric`;
  useEffect(() => {
    axios
      .get(foreUrl)
      .then((response) => console.log(response.data.list))
      .catch((error) => {
        console.log(error);
      });
  }, [data.city.name]);

  return <div>WeatherForecast</div>;
}

export default WeatherForecast;
