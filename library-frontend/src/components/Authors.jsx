import { useState } from 'react'
import Select from 'react-select'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const BirthYear = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [updateAuthor] = useMutation(EDIT_AUTHOR)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!name || !born) {
      return
    }

    updateAuthor({
      variables: { name, setBornTo: Number(born) },
      refetchQueries: [{ query: ALL_AUTHORS }]
    })

    setName('')
    setBorn('')
  }


  return (
    <div>
      <h3>Set BirthYear</h3>
      {/* TODO: Add form with a name input field and a birth year field.
  the value of the field should be stored in the state variables name and born.
  */}

      <form onSubmit={handleSubmit}>
        <div>
          name
          <Select options={authorsOptions} />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

const Authors = () => {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return null
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <BirthYear />
    </div>
  )
}

export default Authors
