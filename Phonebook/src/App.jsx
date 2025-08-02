import Person from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import { useState, useEffect } from 'react'
import PersonsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    PersonsService
      .getAll()
      .then(initalObject => {
        setPersons(initalObject)
      })
  }, [])

  const personToShow = persons.filter(person => new RegExp(filter, "i").test(person.name))

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }


  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleDelete = (id, name) => {
    // console.log(id);

    const isConfirmed = window.confirm(`Delete ${name} ?`)

    if (isConfirmed) {
      const delId =
        PersonsService
          .deleteObject(id)

      setPersons(persons.filter(person => person.id !== delId))
    }
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const isAdded = persons.find(person => person.name === newName)

    if (isAdded) {
      const confirmReplace = window.confirm(`${newName} is already added to the phonebook. Replace the old number to the new one?`)
      if (confirmReplace) {
        PersonsService
          .update(isAdded.id, nameObject)
          .then(returnedObject => {
            setPersons(persons.map(person => person.name === newName ? returnedObject : person))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      PersonsService
        .create(nameObject)
        .then(returnedObject => {
          setPersons(persons.concat(returnedObject))
          setNewName("")
          setNewNumber("")
        })
    }

  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h2>Add new</h2>
      <PersonForm addNewPerson={addNewPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Person personToShow={personToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App