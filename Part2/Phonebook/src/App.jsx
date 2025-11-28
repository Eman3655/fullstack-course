import { useState , useEffect} from 'react'
import PersonForm from './components/PersonForm'
import PersonsFilter from './components/PersonsFilter'
import Persons from './components/Persons'
import personsService from './components/personServ'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

useEffect(() => {
  personsService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
}, [])

    const addPerson = async (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = { name: newName, number: newNumber}

    personsService
      .create(newPerson)
      .then(created => {
        setPersons(persons.concat(created))
        setNewName('')
        setNewNumber('')
      }).catch (error=> {
    console.error("Error adding person:", error);
  })
};

    const personsToShow = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
        <div>
      <h2>Phonebook</h2>

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
      <Persons persons={personsToShow} />
    </div>
  )
}
export default App
