const express = require('express')
const app = express()

const rawPersons = [
  { id: '1', name: 'Arto Hellas', number: '040-123456' },
  { id: '2', name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: '3', name: 'Dan Abramov', number: '12-43-234345' },
  { id: '4', name: 'Mary Poppendieck', number: '39-23-6423122' }
]

const persons = new Map(rawPersons.map(p => [p.id, p]))

app.get('/api/persons', (req, res) => {
  res.json(Array.from(persons.values()))
})

app.get('/info', (req, res) => {
  const count = persons.size
  const date = new Date()
  res.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${date}</p>
  `)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.get(id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).json({ error: 'Person not found' })
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const { id } = req.params
  if (!persons.has(id)) {
    return res.status(404).json({ error: 'Person not found' })
  }
  persons.delete(id)
  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})









