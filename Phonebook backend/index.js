const express = require("express")
const morgan = require('morgan')
const app = express()

app.use(express.json())

morgan.token('data', function (req, res) { return JSON.stringify(req.body) })
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))


let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const infoHtml =
        `
    <h1>Hello!</h1>
    <p>Phonebook has info for ${persons.length} people.</p>
    <p>Time now: ${new Date()}</p>
    `

    response.send(infoHtml)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id

    const person = persons.find(person => person.id === id)

    if (!person) {
        response.status(404).json({
            error: "404 Person Not Found."
        })
    } else {
        response.json(person)
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id

    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const id = Math.floor(Math.random() * 1e13) + 1

    return String(id)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    const isNameExisted = persons.find(person => person.name === body.name)

    const isInvalid = !body.name || !body.number || isNameExisted

    if (isInvalid) {
        if (!body.name) {
            response.status(400).json({
                error: 'name is missing'
            })
        }

        if (!body.number) {
            response.status(400).json({
                error: 'number is missing'
            })
        }

        if (isNameExisted) {
            response.status(400).json({
                error: 'name must be unique'
            })
        }
    } else {
        const newPerson = {
            name: body.name,
            number: body.number,
            id: generateId()
        }
        persons = persons.concat(newPerson)

        console.log(newPerson);
        response.json(newPerson)
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}.`);
})