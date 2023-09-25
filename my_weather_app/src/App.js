import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import WeatherForm from "./components/weatherForm";
import WeatherOutput from "./components/weatherOutput";

function App() {
  const [city, setCity] = useState({
    name: "",
    temp: 0,
    lat: "",
    lon: "",
    opts: [],
  });
  const sessionData = { city, setCity };

  const WEATHER_API_KEY = "8f81e9f0ce84e9bd3fe8f09a74cdd101";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${WEATHER_API_KEY}&units=metric`;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        // console.log(response.data);
        const data = response.data;
        setCity({
          ...city,
          name: data.name,
          temp: data.main.temp,
          lat: city.lat,
          lon: city.lon,
      
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [city.name]);



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
