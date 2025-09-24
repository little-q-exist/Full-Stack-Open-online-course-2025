import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

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

  const noteFormRef = useRef()

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
      dispatch(setNotification('Wrong username or password', 5000))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('blogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))

      noteFormRef.current.toggleVisibility()

      dispatch(setNotification(`the blog "${newBlog.title}" was created.`, 5000))
    }
    catch (error) {
      dispatch(setNotification(`error occured: ${error.response.data.error}`, 5000))
    }
  }

  const addLike = async (blogObject) => {
    const likedBlog = await blogService.like(blogObject, blogObject.id)
    setBlogs(blogs.map(blog => blog.id === likedBlog.id ? likedBlog : blog))
  }

  const deleteBlog = async (blogObject) => {
    const confirmDelete = window.confirm(`Are you sure to delete "${blogObject.title}"?`)
    if (confirmDelete) {
      await blogService.deleteBlog(blogObject)
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
    }
  }

  const compareLikes = (a, b) => {
    return b.likes - a.likes
  }

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Notification />
        <LoginForm handleLogin={handleLogin} handleUsernameChange={({ target }) => { setUsername(target.value) }}
          handlePasswordChange={({ target }) => { setPassword(target.value) }}
          username={username}
          password={password} />
      </div>
    )
  }

  blogs.sort(compareLikes)
  const blogToShow = blogs.map(blog =>
    <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog} />
  )

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <p>{user.name} has logged in.</p>
      <button onClick={handleLogout}>logout</button>

      <Togglable buttonLabel={'Create a new blog'} ref={noteFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>

      {blogToShow}
    </div>
  )
}

export default App