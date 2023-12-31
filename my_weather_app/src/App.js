import React, { useEffect, useState } from "react";
import axios from "axios";

import "./components/styles.css";
import WeatherForm from "./components/weatherForm";
import WeatherOutput from "./components/weatherOutput";
import WeatherForecast from "./components/weatherForecast";

function App() {
  const [city, setCity] = useState({
    name: "",
    temp: 0,
    lat: "",
    lon: "",
    opts: [],
    weather: "",
    forecast:[]
  });
  const [weather, setWeather] = useState("");
  const sessionData = { city, setCity };

  const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&lang=el&appid=${WEATHER_API_KEY}&units=metric`;

  //Take from the API the name and the temperature from the search
  useEffect(() => {
    if (city.name) {
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
            weather: data.weather[0].main,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [city.name]);


  //Check the weather (from API) and set the state weather to some value
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

  //Check the weather state and add the appropriate class including the background image
  useEffect(() => {
    //Remove all the classes from the body
    document.body.classList.remove("clouds");
    document.body.classList.remove("clear");
    document.body.classList.remove("rain");
    document.body.classList.remove("other");

    //Add classes to the body depending on the weather state
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

  return (
    <>
      <div className="app-wrapper">
        <WeatherForm data={sessionData} />
        <WeatherOutput data={sessionData} />
        <WeatherForecast data={sessionData} />
      </div>
    </>
  );
}

export default App;
