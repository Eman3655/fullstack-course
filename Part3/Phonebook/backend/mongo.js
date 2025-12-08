const mongoose = require('mongoose')

const [,, password, name, number] = process.argv

if (!password) {
  console.log('Usage:')
  console.log('  node mongo.js <password>')
  console.log('  node mongo.js <password> "<name>" <number>')
  process.exit(1)
}

const username = 'phonebook-db'

const dbName = 'phonebook-db'

const encodedPassword = encodeURIComponent(password)

const url = `mongodb+srv://${username}:${encodedPassword}@cluster0.dayxxeu.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)



async function listAll() {
  try {
    await mongoose.connect(url)
    const persons = await Person.find({})

    console.log('phonebook:')
    persons.forEach(p => {
      console.log(`${p.name} ${p.number}`)
    })

    await mongoose.connection.close()
  } catch (error) {
    console.error('Error:', error.message)
  }
}

async function addOne(name, number) {
  if (!name || !number) {
    console.log('Please give name and number')
    process.exit(1)
  }

  try {
    await mongoose.connect(url)

    const person = new Person({ name, number })
    await person.save()

    console.log(`added ${name} number ${number} to phonebook`)

    await mongoose.connection.close()
  } catch (error) {
    console.error('Error:', error.message)
  }
}

if (process.argv.length === 3) {
  listAll()
} else if (process.argv.length === 5) {
  addOne(name, number)
} else {
  console.log('Wrong number of arguments')
}
