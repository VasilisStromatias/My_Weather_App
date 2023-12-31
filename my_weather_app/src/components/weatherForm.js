import React, { useEffect, useState } from "react";
import axios from "axios";

import { LuSearch } from "react-icons/lu";

function WeatherForm({ data }) {
  const [input, setInput] = useState("");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [options, setOptions] = useState([]);

  const GEO_API_KEY = process.env.REACT_APP_GEO_API_KEY;
  const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${GEO_API_KEY}`;

  //Take from the API the coords and the other options from the search
  //Fill the states with the data we took from the API
  useEffect(() => {
    if (input) {
      axios
        .get(geoUrl)
        .then((response) => {
          const res = response.data[0];

          // FOR THE COORDS
          const la = res.lat.toString();
          const lo = res.lon.toString();
          setLat(la);
          setLon(lo);

          // FOR THE OPTIONS
          setOptions(response.data);
        })
        .catch((error) => {
          console.log("Insert City");
        });
    }
  }, [input]);

  // Pass onSubmit the state values from this page to the main state(city) to the App.js
  function handleSubmit(e) {
    e.preventDefault();
    data.setCity({
      ...data.city,
      name: input,
      lat: lat,
      lon: lon,
      opts: options,
    });
    setInput("");
    setOptions([]);
  }

  const filteredProducts = options.filter((opt) => opt.country.includes("GR"));

  return (
    <div className="weather-form-wrapper">
      <div className="weather-form-inner">
        <form onSubmit={handleSubmit}>
          <div className="search-wrapper">
            <input
              type="text"
              value={input}
              placeholder="Enter your city here..."
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <div className="search-icon">
              <button type="submit">
                <LuSearch />
              </button>
            </div>
            <div className="options">
              <ul className="options-list">
                {filteredProducts.map((opt, key) => {
                  return (
                    <li key={key} className="option-item">
                      <a
                        href="/"
                        onClick={(e) => {
                          e.preventDefault();
                          setInput(e.target.innerText);
                          setOptions([]);        
                        }}
                      >
                        {opt.name}
                      </a>
                      {/* <span>{opt.country}</span> */}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WeatherForm;
