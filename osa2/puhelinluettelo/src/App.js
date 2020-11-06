import React, { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [ persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  
  const saveContact = (event) => {
    event.preventDefault()

    const newObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    }
    const addContact = () => {
      setPersons(persons.concat(newObject))
      setNewName('')
      setNewNumber('')
    }  

    persons.filter(person => person.name===newName).length
      ? alert(`${newName} is already added to phonebook`)
      : addContact()
  }

  const list = persons.filter(person => person.name.match(RegExp(filter,'i')))    
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {     
     setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {     
    setFilter(event.target.value)
 }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilter={handleFilter} />
      
      <h3>Add new</h3>

      <PersonForm
        handleForm={saveContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons list={list} />

    </div>
  )

}

export default App