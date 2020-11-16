import React from 'react'

const Persons = ({list,handleDeletePerson}) => 
  <div>
    {list.map((person) => 
      <Person key={person.id} person={person} handleDeletePerson={handleDeletePerson}/>)
    }
  </div>

const Person = ({person, handleDeletePerson}) => 
  <p>{person.name} {person.number} <Button person={person} handleDeletePerson={handleDeletePerson}/></p>

const Button = ({person, handleDeletePerson}) =>
  <button type='button' value={person.id} onClick={handleDeletePerson}>delete</button>

export default Persons