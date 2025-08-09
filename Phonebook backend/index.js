require('dotenv').config()

const express = require("express")
const morgan = require('morgan')
const app = express()
const Person = require('./models/persons')

app.use(express.json())

morgan.token('data', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan('tiny'))


// let persons = [
//     {
//         id: "1",
//         name: "Arto Hellas",
//         number: "040-123456"
//     },
//     {
//         id: "2",
//         name: "Ada Lovelace",
//         number: "39-44-5323523"
//     },
//     {
//         id: "3",
//         name: "Dan Abramov",
//         number: "12-43-234345"
//     },
//     {
//         id: "4",
//         name: "Mary Poppendieck",
//         number: "39-23-6423122"
//     }
// ]


app.get('/info', (request, response) => {
    const infoHtml =
        `
    <h1>Hello!</h1>
    <p>Phonebook has info for ${Person.length} people.</p>
    <p>Time now: ${new Date()}</p>
    `

    response.send(infoHtml)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id

    Person.findById(id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id

    Person.findByIdAndDelete(id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.put('/api/persons/:id', (request, response) => {
    const { name, number } = request.body

    Person.findById(request.params.id)
        .then(person => {
            if (!person) {
                return response.status(404).end()
            }

            person.name = name
            person.number = number

            return person.save().then(result => {
                response.json(result)
            })
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.log(error);
    if (error.name === "CastError") {
        response.status(404).send({ error: 'malformatted id' })
    }

    next(error)
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}.`);
})