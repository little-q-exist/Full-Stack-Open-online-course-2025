import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    const nonExisting = {
        id: 10000,
        content: "this is deleted",
        important: true
    }
    return request.then(response => response.data.concat(nonExisting))
}

const create = noteObject => {
    const request = axios.post(baseUrl, noteObject)
    return request.then(response => response.data)
}

const update = (id, noteObject) => {
    const request = axios.put(`${baseUrl}/${id}`, noteObject)
    return request.then(response => response.data)
}

export default { getAll, create, update }