import { Routes, Route, Link } from 'react-router'
import { useEffect, useState } from 'react'
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from './components/LoginForm'
import Error from './components/Error'
import Recommendations from './components/Recommendations'
import { useApolloClient } from '@apollo/client';

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const client = useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem('libraryBook-user-token'))
  }, [])

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem('libraryBook-user-token')
    client.resetStore()
  }

  return (
    <div>
      <div>
        <Link to="/authors">authors</Link>
        <Link to="/books">books</Link>
        {
          token ?
            <>
              <Link to="/recommendations">recommendations</Link>
              <Link to="/add">add book</Link>
              <button onClick={handleLogout}>logout</button>
            </>
            :
            <Link to="/login">login</Link>
        }
      </div>

      <Error errorMessage={errorMessage} />

      <Routes>
        <Route path='/' element={<></>} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path='/recommendations' element={<Recommendations />} />
        <Route path='/login' element={<LoginForm setErrorMessage={setErrorMessage} setToken={setToken} />} />
      </Routes>
    </div>
  )
}

export default App;
