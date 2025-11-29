import { useEffect, useState } from 'react'
import axios from 'axios'
import CountriesList from './components/CountriesList'
import CountryDetails from './components/CountryDetails'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) => {
    setFilter(event.target.value)
    setSelected(null)
  }

  const filtered = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      find countries <input value={filter} onChange={handleChange} />

      {filtered.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {filtered.length <= 10 && filtered.length > 1 && (
        <CountriesList
          countries={filtered}
          onShow={setSelected}
        />
      )}

      {(filtered.length === 1 || selected) && (
        <CountryDetails country={selected || filtered[0]} />
      )}
    </div>
  )
}

export default App
