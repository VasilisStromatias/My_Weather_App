import React from 'react'

function WeatherOutput({data}) {
  return (
    <div>
        <h1> Output</h1>
        {data.city.name}
        {data.city.temp}
    </div>
  )
}

export default WeatherOutput
