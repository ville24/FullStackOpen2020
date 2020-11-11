import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const [ filter, setFilter] = useState('')

  const countryList = countries.filter(country => 
    country.name.match(RegExp(filter,'i'))
  )
  
  let output

  filter
  ? (
    countryList.length > 10
    ? output = 'Too many matches, specify another filter'
    : output = <Countries countryList={countryList} />
  )
  : output = ''

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (event) => {     
    setFilter(event.target.value)
  }


  return (
    <div>
      <Filter filter={filter} handleFilter={handleFilter} />
      <div>{output}</div>
    </div>
  )
}

export default App
