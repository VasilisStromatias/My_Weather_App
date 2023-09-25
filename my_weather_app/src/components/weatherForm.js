import React, { useEffect, useState } from "react";
import axios from "axios";

function WeatherForm({ data }) {
  const [input, setInput] = useState("");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [options, setOptions] = useState([]);

  const GEO_API_KEY = "8f81e9f0ce84e9bd3fe8f09a74cdd101";
  const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${GEO_API_KEY}`;

  useEffect(() => {
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
        console.log(response.data); // (5) [{…}, {…}, {…}, {…}, {…}]
        setOptions(response.data);
      })
      .catch((error) => {
        console.log("Insert City");
      });
  }, [input]);

  function handleSubmit(e) {
    e.preventDefault();
    data.setCity({ ...data.city, name: input, lat: lat, lon: lon });
    setInput("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <div className="options">
          <ul className="options-list">
            {options.map((opt, key) => {
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
                  <span>{opt.country}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default WeatherForm;
