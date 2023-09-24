import React, { useEffect, useState } from 'react'
import axios from 'axios';


function WeatherForm({data}) {
const GEO_API_KEY = 'I2JJ7BWpAGsTSemsqLvGCLe6vSpzm6M6';
const c = 'Lamia';
const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${GEO_API_KEY}?q=${c}`

const [input, setInput] = useState('')

// useEffect(() => {
// axios.get(url)
// .then (response => console.log(response))
// .catch(error => console.log('Error Axios'))
// })

function handleSubmit(e) {
    e.preventDefault();
    data.setCity({...data.city ,name : input})
    setInput('')
}

    return (
    <div>
        <form onSubmit={handleSubmit}>
        <input type='text' value={input} onChange={(e) => {setInput(e.target.value)}} />
            <button>Submit</button>
        </form>
    </div>
  )
}

export default WeatherForm
