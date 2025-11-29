import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) => setFilter(event.target.value)

  const filterCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      find countries <input value={filter} onChange={handleChange} />

      {filterCountries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {filterCountries.length <= 10 && filterCountries.length > 1 && (
        <ul>
          {filterCountries.map(country =>
            <li key={country.cca3}>{country.name.common}</li>
          )}
        </ul>
      )}

      {filterCountries.length === 1 && (
        <div>
          <h2>{filterCountries[0].name.common}</h2>
          <p>Capital: {filterCountries[0].capital?.[0]}</p>
          <p>Area: {filterCountries[0].area}</p>
          <h3>Languages:</h3>
          <ul>
            {Object.values(filterCountries[0].languages || {}).map(lang =>
              <li key={lang}>{lang}</li>
            )}
          </ul>

          <img
            src={filterCountries[0].flags.png}
            alt={filterCountries[0].flags.alt}
            width="200"
          />
        </div>
      )}
    </div>
  )
}

export default App


