import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

export const getNotes = () => {
    return axios.get(baseUrl).then(res => res.data)
}

export const createNote = (newNote) => {
    return axios.post(baseUrl, newNote).then(res => res.data)
}

export const updateNote = (note) => {
    return axios.put(`${baseUrl}/${note.id}`, note).then(res => res.data)
}