const note = require('../models/note')
const Note = require('../models/note')
const User = require('../models/user')

const initialNotes = [
    {
        content: 'HTML is easy',
        important: false
    },
    {
        content: 'Browser can execute only JavaScript',
        important: true
    }
]

const nonExistingId = async () => {
    const note = new Note({ content: 'willBeRemovedSoon' })
    await note.save()
    await note.deleteOne()

    return note._id.toString()
}

const notesInDB = async () => {
    const notes = await Note.find({})
    return notes.map(note => note.toJSON())
}

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = { initialNotes, nonExistingId, notesInDB, usersInDB }