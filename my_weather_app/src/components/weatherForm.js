import React, { useState } from 'react'


function WeatherForm({data}) {

const [input, setInput] = useState('')

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
