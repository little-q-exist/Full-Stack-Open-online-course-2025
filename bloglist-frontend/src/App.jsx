import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('blogappUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('blogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)

      setUsername('')
      setPassword('')
    } catch {
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('blogappUser')
    setUser(null)
  }

  const handleBlogSubmit = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(newBlog))

      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      setMessage(`error occured: ${error.response.data.error}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Notification message={message} />
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => { setUsername(target.value) }}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input type="password"
                value={password}
                onChange={({ target }) => { setPassword(target.value) }}
              />
            </label>
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>{user.name} has logged in.</p>
      <button onClick={handleLogout}>logout</button>
      <h2>Add new blogs</h2>
      <form onSubmit={handleBlogSubmit}>
        <div>
          <label>
            title
            <input type="text" value={title} onChange={({ target }) => { setTitle(target.value) }} />
          </label>
        </div>
        <div>
          <label>
            author
            <input type="text" value={author} onChange={({ target }) => { setAuthor(target.value) }} />
          </label>
        </div>
        <div>
          <label>
            url
            <input type="text" value={url} onChange={({ target }) => { setUrl(target.value) }} />
          </label>
        </div>
        <button type='submit'>post blog</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App