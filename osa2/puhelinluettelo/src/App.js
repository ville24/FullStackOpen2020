import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  
  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const saveContact = (event) => {
    event.preventDefault()

    const newObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    }
    const addContact = () => {
      personsService
      .create(newObject)
      .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
      })
    }  

    persons.filter(person => person.name===newName).length
      ? alert(`${newName} is already added to phonebook`)
      : addContact()
  }

  const handleDeletePerson = (event) => {
    window.confirm(`Delete ${persons.filter(person => person.id===parseInt(event.target.value))[0].name}?`)
    && (personsService
      .del(event.target.value)
      .then(response => {
        setPersons(persons.filter(person => person.id !== parseInt(event.target.value) && person))
      }))
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

      <Persons list={list} handleDeletePerson={handleDeletePerson}/>

    </div>
  )

}

export default App