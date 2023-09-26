import React from "react";

import { RiCelsiusFill } from "react-icons/ri";

function WeatherOutput({ data }) {
  if (data.city.name === "") {
    return <div></div>;
  } else {
    return (
      <div className="weather-output-wrapper">
        <div className="weather-output-inner">
          <div className="city-name">
            <h2>{data.city.name}</h2>
          </div>
          <div className="city-temp">
            <span>{data.city.temp}</span>
            <RiCelsiusFill color="#f2f2f2" size={"25px"} />
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherOutput;
