require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./person')

const app = express()
app.use(express.json()) 
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))

app.use(cors())


const rawPersons = [
  { id: '1', name: 'Arto Hellas', number: '040-123456' },
  { id: '2', name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: '3', name: 'Dan Abramov', number: '12-43-234345' },
  { id: '4', name: 'Mary Poppendieck', number: '39-23-6423122' }
]

const persons = new Map(rawPersons.map(p => [p.id, p]))

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
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

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body
  if (!name || !number) {
    return res.status(400).json({ error: 'name and number are required' })
  }

  const nameExists = Array.from(persons.values()).find(p => p.name.toLowerCase() === name.toLowerCase())

  if (nameExists) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  const id = Math.floor(Math.random() * 1000000)
  const newPerson = { id, name, number }

  persons.set(id.toString(), newPerson)
  res.status(201).json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})










