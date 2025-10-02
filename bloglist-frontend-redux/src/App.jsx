import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blogs from './pages/Blogs'
import Users from './pages/Users'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { setBlogs, addBlogs, updateBlogs, deleteBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { setUsers } from './reducers/usersReducer'
import useInputField from './hooks/useInputField'
import { Link, Route, Routes, useMatch } from 'react-router'
import User from './pages/User'
import BlogView from './pages/BlogView'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const currentUser = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const username = useInputField('text')
  const password = useInputField('password')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(setBlogs(blogs))
    )
  }, [dispatch])

  useEffect(() => {
    userService.getAll().then(users =>
      dispatch(setUsers(users))
    )
  }, [blogs, dispatch])


  useEffect(() => {
    const userJSON = window.localStorage.getItem('blogappUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')

  const selectedUser = userMatch ?
    users.find(user => user.id === userMatch.params.id) :
    null

  const selectedBlog = blogMatch ?
    blogs.find(blog => blog.id === blogMatch.params.id) :
    null

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
        .then(() => dispatch(deleteBlogs(blogObject)))
        .catch(error => {
          if (error.response?.status === 401) {
            dispatch(setNotification('Cannot delete blog of others', 5000))
          }
        })
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

  if (currentUser === null) {
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

      <div>
        <Link to={'/'}>HOME</Link>
        <Link to={'/users'}>USERS</Link>
      </div>

      <Notification />
      <p>{currentUser.name} has logged in.</p>
      <button onClick={handleLogout}>logout</button>

      <Routes>
        <Route path='/' element={<Blogs noteFormRef={noteFormRef} addBlog={addBlog} blogToShow={blogToShow} />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User user={selectedUser} />} />
        <Route path='/blogs/:id' element={<BlogView blog={selectedBlog} addLike={addLike} deleteBlog={deleteBlog} />} />
      </Routes>


    </div>
  )
}

export default App