import React from 'react'

const Countries = ({countryList,handleShowDetails}) => {
    let output
    
    countryList.length === 1 || output==='details'
    ? output = <div>
        <CountryDetails country={countryList[0]} />
    </div>
    : output = <div>{countryList.map((country) => 
        <Country key={country.alpha2Code} country={country} handleShowDetails={handleShowDetails}/>)}
    </div>

    return (
        <div>{output}</div>
    )
}

const Country = ({country,handleShowDetails}) =>
    <div>
        {country.name} 
        <button type='button' value={country.name} onClick={handleShowDetails}>show</button>
           
    </div>

const CountryDetails = ({country}) =>
    <div>
        <h2>{country.name}</h2>
        <div>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
        </div>
        <h3>languages</h3>
        <ul>
            {country.languages.map((language) =>
                <Language key={language.iso639_1} language={language} />
            )}
        </ul>
        <div>
            <img src={country.flag} width='200' />
        </div>
    </div>

const Language = ({language}) =>
    <li>{language.name}</li>


export default Countries