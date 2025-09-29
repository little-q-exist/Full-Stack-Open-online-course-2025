import { useState, useEffect, useRef, useContext } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import NotificationContext from './NotificationContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import UserContext from './UserContext'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, messageDispatch] = useContext(NotificationContext)
  const [user, userDispatch] = useContext(UserContext)

  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      noteFormRef.current.toggleVisibility()

      messageDispatch({ type: 'SET_MESSAGE', payload: `the blog "${newBlog.title}" was created.` })
      setTimeout(() => {
        messageDispatch({ type: 'CLEAR' })
      }, 5000);
    },
    onError: (error) => {
      messageDispatch({ type: 'SET_MESSAGE', payload: `error occured: ${error.response.data.error}` })
      setTimeout(() => {
        messageDispatch({ type: 'CLEAR' })
      }, 5000);
    }
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.like,
    onSuccess: (likedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.map(blog => blog.id === likedBlog.id ? likedBlog : blog))
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (deletedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.filter(blog => blog.id !== deletedBlog.id))
    }
  })

  useEffect(() => {
    const userJSON = window.localStorage.getItem('blogappUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      userDispatch({ type: 'SET_USER', payload: user })
      blogService.setToken(user.token)
    }
  }, [userDispatch])

  const noteFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('blogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({ type: 'SET_USER', payload: user })

      setUsername('')
      setPassword('')
    } catch {
      messageDispatch({ type: 'SET_MESSAGE', payload: 'WRONG username or password' })
      setTimeout(() => {
        messageDispatch({ type: 'CLEAR' })
      }, 5000);
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('blogappUser')
    userDispatch({ type: 'SET_USER', payload: null })
  }

  const addBlog = (blogObject) => {
    newBlogMutation.mutate(blogObject)
  }

  const addLike = async (blogObject) => {
    updateBlogMutation.mutate(blogObject)
  }

  const deleteBlog = async (blogObject) => {
    const confirmDelete = window.confirm(`Are you sure to delete "${blogObject.title}"?`)
    if (confirmDelete) {
      deleteBlogMutation.mutate(blogObject)
    }
  }

  const compareLikesDesc = (a, b) => {
    return b.likes - a.likes
  }

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Notification message={message} />
        <LoginForm handleLogin={handleLogin} handleUsernameChange={({ target }) => { setUsername(target.value) }}
          handlePasswordChange={({ target }) => { setPassword(target.value) }}
          username={username}
          password={password} />
      </div>
    )
  }

  if (result.isLoading) {
    return (
      <h3>Blog is loading...</h3>
    )
  }

  const blogs = result.data

  const blogToShow = blogs.toSorted(compareLikesDesc).map(blog =>
    <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog} />
  )

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} />
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