import React from 'react'

const Persons = ({list}) => 
  <div>
    {list.map((person) => 
      <Person key={person.id} person={person} />)
    }
  </div>

const Person = ({person}) => 
  <p>{person.name} {person.number}</p>

  export default Persons