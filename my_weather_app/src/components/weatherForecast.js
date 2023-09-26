import React, { useState, useEffect,useId } from "react";
import axios from "axios";

import { RiCelsiusFill } from "react-icons/ri";
import {WiHumidity} from "react-icons/wi"

function WeatherForecast({ data }) {
  const FORE_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const foreUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.city.lat}&lon=${data.city.lon}&cnt=9&appid=${FORE_API_KEY}&units=metric`;
  
  const [forecast,setForecast] = useState([]);
  
  useEffect(() => {
    if(data.city.name){

      axios
        .get(foreUrl)
        .then((response) => 
        {
          const forecastData = response.data.list;
          console.log(forecastData);
          setForecast(forecastData);
        }
        )
        .catch((error) => {
          console.log(error);
        });

    }
    
  }, [data.city.name]);


  return (
    <div  className="forecast-wrapper">
      <div className="forecast-inner">
        
      {forecast.map((f, key) => {
        return (
          <div key={key} className="forecast-item">
              <div className="forecast-date">
                <span>
              {f.dt_txt}
                </span>
              </div>
              <div className="forecast-temperature">
                <span>
              {f.main.temp}
                </span>
                <RiCelsiusFill />
              </div>
              <div className="forecast-weather"> 
                <span>
                {f.weather[0].description}
                </span>
              </div>
              <div className="forecast-icon">
                <img src={`http://openweathermap.org/img/w/${f.weather[0].icon}.png`} alt="icon"/>
              </div>
              <div className="forecast-cloud-percentage">
                <span>
                  {f.main.humidity} %
                </span>
                  <WiHumidity />
              </div>
          </div>
        )
      })}
        
      </div>
    </div>

  )
}

export default WeatherForecast;
