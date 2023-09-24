import React, {useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';
import WeatherForm from './components/weatherForm';
import WeatherOutput from './components/weatherOutput';

function App() {

  const lat = '38.03491'
  const lon = '23.73811'
  const WEATHER_API_KEY = '8f81e9f0ce84e9bd3fe8f09a74cdd101'
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`

  const [city, setCity] = useState({name: '', temp : 0})
  const sessionData = {city, setCity}


  useEffect(() => {
    axios.get(url)
    .then( response =>  {
      console.log(response.data)
      const data = response.data
      setCity( {
        ...city, name:data.name, temp : data.main.temp
      })
    })
    .catch(error => {
      console.log(error)
    })
  },city)
  

  return (
    <>
    <div className= "app-wrapper"> 
      <WeatherForm data={sessionData} />
      <WeatherOutput data={sessionData} />
    </div>
    </>
  );
}

export default App;
