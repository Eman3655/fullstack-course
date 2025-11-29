const CountriesList = ({ countries, onShow }) => {
  return (
    <ul>
      {countries.map(country => (
        <li key={country.cca3}>
          {country.name.common}{' '}
          <button onClick={() => onShow(country)}>Show</button>
        </li>
      ))}
    </ul>
  )
}

export default CountriesList
