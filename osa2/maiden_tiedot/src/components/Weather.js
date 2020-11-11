import React, { useState } from 'react'
import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY

const Weather = ({country}) => {
    const [ weather, setWeather ] = useState([])

    let output = ''

    const getWeather = () => {
        axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name}`)
        .then(response => {
            setWeather(response.data.current)
        })
    }
    weather.length===0 
    ? getWeather()
    : output = <div>
        <h3>Weather in {country.capital}</h3>
        <div>temperature {weather.temperature} Celcius</div>
        <div>{weather.weather_icons.map((icon, index) => <WeatherIcon key={index} icon={icon} />)}</div>
        <div>Wind: {weather.wind_speed} mph direction {weather.wind_dir}</div>
    </div>

    return (<div>{output}</div>)
}

const WeatherIcon = ({icon}) =>
    <img src={icon} />


export default Weather