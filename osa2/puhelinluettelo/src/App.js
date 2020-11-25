import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Error from './components/Error'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ error , setError ] = useState(null)
  const [ notification , setNotification ] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const saveContact = (event) => {
    event.preventDefault()

    const addContact = () => {
      const newObject = {
        id: persons.length + 1,
        name: newName,
        number: newNumber,
      }

      personsService
      .create(newObject)
      .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setNotification(`Added ${response.data.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 3000)
      })
    }

    const updateContact = (changedPerson) => {
      const changedObject= {...changedPerson, number: newNumber}

      personsService
      .update(changedPerson.id, changedObject)
      .then(response => {
          setPersons(persons.map(person => person.id !==changedPerson.id ? person : response.data))
          setNewName('')
          setNewNumber('')
          setNotification(`Updated ${response.data.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 3000)
      })
      .catch(error => {
          setError(`Information of ${changedPerson.name} has already been removed from server`)
          setPersons(persons.filter(person => person.id !== changedPerson.id))
          setTimeout(() => {
            setError(null)
          }, 3000)
      })
    }  

    const personMatch=persons.find(person => person.name===newName)
    personMatch
      ? (
          personMatch.number===newNumber
          ? alert(`${newName} is already added to phonebook`)
          : (
              window.confirm(`${newName} is already added to phonebook, replace the old number with the one?`)
              && updateContact(personMatch)
            )
      )
      : addContact()
  }

  const handleDeletePerson = (event) => {
    const name = persons.filter(person => person.id===parseInt(event.target.value))[0].name
    window.confirm(`Delete ${name}?`)
    && (personsService
      .del(event.target.value)
      .then(response => {
        setPersons(persons.filter(person => person.id !== parseInt(event.target.value) && person))
        setNotification(`Deleted ${name}`)
          setTimeout(() => {
            setNotification(null)
          }, 3000)
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

      <Error message={error} />
      <Notification message={notification} />

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