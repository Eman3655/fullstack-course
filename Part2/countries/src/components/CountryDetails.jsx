import { useEffect, useState } from 'react'
import axios from 'axios'

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    const capital = country.capital?.[0]
    if (!capital) return

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`

    axios
      .get(url)
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => {
        console.log('Error fetching weather:', error)
      })
  }, [country, api_key])
  
  if (!country) return null

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Area: {country.area}</p>

      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages || {}).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={country.flags.alt}
        width="200"
      />

      {weather && (
        <>
          <h3>Weather in {country.capital?.[0]}</h3>
          <p>Temperature: {Math.round(weather.main.temp)} °C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </>
      )}
    </div>
  )
}

export default CountryDetails
