import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const asObject = (content) => {
    return {
        content,
        votes: 0
    }
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (content) => {
    const response = await axios.post(baseUrl, asObject(content))
    return response.data
}

const update = async (id, Object) => {
    const response = await axios.put(`${baseUrl}/${id}`, Object)
    return response.data
}

export default { getAll, create, update }