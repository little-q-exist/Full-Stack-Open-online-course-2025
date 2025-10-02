import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const create = async (blogObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const like = async (blogObject) => {
  const likedBlog = { ...blogObject, likes: blogObject.likes + 1 }
  const id = likedBlog.id
  const response = await axios.put(`${baseUrl}/${id}`, likedBlog)
  return response.data
}

const deleteBlog = async (blogObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const id = blogObject.id
  await axios.delete(`${baseUrl}/${id}`, config)
}

const postComment = async (commentContent, blogID) => {
  const id = blogID
  const comment = { content: commentContent }
  const response = await axios.post(`${baseUrl}/${id}/comment`, comment)
  return response.data
}

export default { getAll, setToken, create, like, deleteBlog, postComment }