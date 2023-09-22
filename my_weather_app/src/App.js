import React, {useState } from 'react';

import './App.css';
import WeatherForm from './components/weatherForm';
import WeatherOutput from './components/weatherOutput';

function App() {

  const [city, setCity] = useState({name: '', temp : 0})
  const sessionData = {city, setCity}

  console.log(city)

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
