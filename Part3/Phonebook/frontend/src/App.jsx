import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import PersonsFilter from './components/PersonsFilter'
import Persons from './components/Persons'
import personsService from './components/personServ'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(p => p.name === newName)
    if (existingPerson) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = { name: newName, number: newNumber }

    personsService
      .create(newPerson)
      .then(created => {
        setPersons(persons.concat(created))
        setNewName('')
        setNewNumber('')
        setNotification({ text: `Added ${created.name}`, type: 'notification' })
        setTimeout(() => setNotification(null), 5000)
      })
      .catch(err => {
        const msg = err.response?.data?.error || 'Error adding person'
        setNotification({ text: msg, type: 'error' })
        setTimeout(() => setNotification(null), 5000)
      })
  }

  const personsToShow = persons.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  )

  const handleDeletePerson = (id, name) => {
    const ok = window.confirm(`Delete ${name} ?`)
    if (!ok) return

    personsService.remove(id).then(() => {
      setPersons(persons.filter(p => p.id !== id))
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification} />

      <PersonsFilter
        filter={filter}
        onFilterChange={e => setFilter(e.target.value)}
      />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        onNameChange={e => setNewName(e.target.value)}
        newNumber={newNumber}
        onNumberChange={e => setNewNumber(e.target.value)}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} onDelete={handleDeletePerson} />
    </div>
  )
}

export default App
