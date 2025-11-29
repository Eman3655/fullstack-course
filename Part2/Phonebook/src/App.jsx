import { useState , useEffect} from 'react'
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
  personsService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
}, [])

const addPerson = async (event) => {
  event.preventDefault()

  const existingPerson = persons.find(person => person.name === newName)
  if (existingPerson) {
    const ok = window.confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`
    )
    if (!ok) return

    const changedPerson = { ...existingPerson, number: newNumber }

    personsService
      .update(existingPerson.id, changedPerson)
      .then(returnedPerson => {
        setPersons(
          persons.map(p => p.id === existingPerson.id ? returnedPerson : p)
        )
        setNewName('')
        setNewNumber('')
        setNotification(`Updated number of ${returnedPerson.name}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    return
  }
  const newPerson = { name: newName, number: newNumber }

  personsService
    .create(newPerson)
    .then(created => {
      setPersons(persons.concat(created))
      setNewName('')
      setNewNumber('')
      setNotification(`Added ${created.name}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    })
    .catch(error => {
      console.error("Error adding person:", error)
    })
}


    const personsToShow = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDeletePerson = (id, name) => {
  const deleteConfirm = window.confirm(`Delete ${name} ?`)
  if (!deleteConfirm) return

  personsService
    .remove(id)
    .then(() => {
      setPersons(persons.filter(p => p.id !== id))
    })
}


  return (
        <div>
      <h2>Phonebook</h2>

      <Notification message={notification} />

      <PersonsFilter
        filter={filter}
        onFilterChange={(e) => setFilter(e.target.value)}
      />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        onNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        onNumberChange={(e) => setNewNumber(e.target.value)}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} onDelete={handleDeletePerson} />
    </div>
  )
}
export default App
