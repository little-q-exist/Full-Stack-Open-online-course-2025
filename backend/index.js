require('dotenv').config()

const express = require('express')
const app = express()
const Note = require('./models/note')


app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response, next) => {
    const id = request.params.id
    Note.findById(id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

// const generateId = () => {
//     const maxId = notes.length > 0 ?
//         Math.max(...notes.map(note => Number(note.id))) :
//         0
//     return String(maxId + 1)
// }

app.post('/api/notes', (request, response) => {

    const body = request.body

    if (!body.content) {
        return response.status(400).json(
            {
                error: "content missing"
            }
        )
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        // id: generateId()
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

app.put('/api/notes/:id', (request, response, next) => {
    const { content, important } = request.body

    Note.findById(request.params.id)
        .then(note => {
            if (!note) {
                return response.status(404).end()
            }

            note.content = content
            note.important = important

            return note.save().then((updatedObject => {
                response.json(updatedObject)
            }))
        })
        .catch(error => next(error))

})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    Note.findByIdAndDelete(id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const unknownEndPoint = (request, response) => {
    return response.status(404).send({ error: 'Unknown EndPoint' })
}

app.use(unknownEndPoint)

const errorHandler = (error, request, response, next) => {
    console.log(error);

    if (error.name === 'CastError') {
        return response.status(404).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})