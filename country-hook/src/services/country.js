import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

const getOne = async (name) => {
    const response = await axios.get(`${baseUrl}/api/name/${name}`)
    return response.data
}

export default { getOne }