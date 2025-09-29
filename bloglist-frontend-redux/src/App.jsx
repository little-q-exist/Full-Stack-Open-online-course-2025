import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { setBlogs, addBlogs, updateBlogs, deleteBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import useInputField from './hooks/useInputField'
import { Route, Routes } from 'react-router'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const username = useInputField('text')
  const password = useInputField('password')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(setBlogs(blogs))
    )
  }, [dispatch])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('blogappUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const noteFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username: username.value, password: password.value })

      window.localStorage.setItem('blogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))

      username.reset()
      password.reset()
    } catch {
      dispatch(setNotification('Wrong username or password', 5000))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('blogappUser')
    dispatch(setUser(null))
  }

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      dispatch(addBlogs(newBlog))

      noteFormRef.current.toggleVisibility()

      dispatch(setNotification(`the blog "${newBlog.title}" was created.`, 5000))
    }
    catch (error) {
      dispatch(setNotification(`error occured: ${error.response.data.error}`, 5000))
    }
  }

  const addLike = async (blogObject) => {
    const likedBlog = await blogService.like(blogObject, blogObject.id)
    dispatch(updateBlogs(likedBlog))
  }

  const deleteBlog = async (blogObject) => {
    const confirmDelete = window.confirm(`Are you sure to delete "${blogObject.title}"?`)
    if (confirmDelete) {
      await blogService.deleteBlog(blogObject)
      dispatch(deleteBlogs(blogObject))
    }
  }

  const compareLikes = (a, b) => {
    return b.likes - a.likes
  }

  const removeProperity = (obj, keyToRemove) => {
    // eslint-disable-next-line no-unused-vars
    const { [keyToRemove]: _, ...rest } = obj
    return rest
  }

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Notification />
        <LoginForm handleLogin={handleLogin} username={removeProperity(username, 'reset')} password={removeProperity(password, 'reset')} />
      </div>
    )
  }

  const blogToShow = blogs.toSorted(compareLikes).map(blog =>
    <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog} />
  )

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <p>{user.name} has logged in.</p>
      <button onClick={handleLogout}>logout</button>

      <Routes>
        <Route path='/' element={<Blogs noteFormRef={noteFormRef} addBlog={addBlog} blogToShow={blogToShow} />}/>
      </Routes>

      
    </div>
  )
}

export default App