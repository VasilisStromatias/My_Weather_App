import React from "react";

import { RiCelsiusFill } from "react-icons/ri";

function WeatherOutput({ data }) {
  return (
    <div className="weather-output-wrapper">
      <div className="weather-output-inner">
        {/* <h1> Output</h1> */}
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

export default WeatherOutput;
