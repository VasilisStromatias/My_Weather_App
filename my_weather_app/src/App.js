import React, { useEffect, useState } from "react";
import axios from "axios";

import "./components/styles.css";
import WeatherForm from "./components/weatherForm";
import WeatherOutput from "./components/weatherOutput";

function App() {
  const [city, setCity] = useState({
    name: "",
    temp: 0,
    lat: "",
    lon: "",
    opts: [],
    weather: "",
  });
  const [weather, setWeather] = useState("");
  const sessionData = { city, setCity };

  const WEATHER_API_KEY = "8f81e9f0ce84e9bd3fe8f09a74cdd101";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${WEATHER_API_KEY}&units=metric`;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        // console.log(response.data);
        // console.log(response.data.weather[0].main);
        const data = response.data;
        setCity({
          ...city,
          name: data.name,
          temp: data.main.temp,
          lat: city.lat,
          lon: city.lon,
          weather: data.weather[0].main,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [city.name]);

  useEffect(() => {
    if (city.weather === "Clouds") {
      setWeather("clouds");
    } else if (city.weather === "Clear") {
      setWeather("clear");
    } else if (city.weather === "Rain" || city.weather === "Drizzle") {
      setWeather("rain");
    } else {
      setWeather("other");
    }
  }, [city.weather]);

  useEffect(() => {
    document.body.classList.remove("clouds");
    document.body.classList.remove("clear");
    document.body.classList.remove("rain");
    document.body.classList.remove("other");

    if (weather === "clouds") {
      document.body.classList.add("clouds");
    } else if (weather === "clear") {
      document.body.classList.add("clear");
    } else if (weather === "rain") {
      document.body.classList.add("rain");
    } else {
      document.body.classList.add("other");
    }
  }, [weather]);

  console.log(city.weather);

  return (
    <>
      <div className="app-wrapper">
        <WeatherForm data={sessionData} />
        <WeatherOutput data={sessionData} />
      </div>
    </>
  );
}

export default App;
