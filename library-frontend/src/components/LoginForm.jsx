/* eslint-disable react/prop-types */
import { useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import { LOGIN } from '../queries'
import { useNavigate } from 'react-router'

const LoginForm = ({ setErrorMessage, setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            setErrorMessage(error.graphQLErrors[0].message)
        }
    })

    const handleLoginSubmit = (event) => {
        event.preventDefault()
        login({ variables: { username, password } })

        setUsername('')
        setPassword('')

        // navigate('/')
    }

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('libraryBook-user-token', token)

            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.data])

    return (
        <div>
            <form onSubmit={handleLoginSubmit}>
                <div>
                    username <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    password <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm