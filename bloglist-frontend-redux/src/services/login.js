import axios from 'axios'
const baseurl = '/api/login'

const login = async (userObject) => {
    const response = await axios.post(baseurl, userObject)

    return response.data
}

export default { login }