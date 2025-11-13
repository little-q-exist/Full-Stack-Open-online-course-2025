/* eslint-disable react/prop-types */
import { useState } from 'react'
import Select from 'react-select'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const BirthYear = ({ authors }) => {
  const [nameOption, setNameOption] = useState(null)
  const [born, setBorn] = useState('')

  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors.map((a) => a.name === response.data.editAuthor.name ? response.data.editAuthor : a)
        }
      })
    },
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!nameOption || !born) {
      return
    }

    updateAuthor({
      variables: { name: nameOption.value, setBornTo: Number(born) }
    })

    setNameOption('')
    setBorn('')
  }

  const authorsOptions = authors.map((a) => { return { value: a.name, label: a.name } })

  return (
    <div>
      <h3>Set BirthYear</h3>
      {/* TODO: Add form with a name select field and a birth year field.
  the value of the field should be stored in the state variables born.
  */}

      <form onSubmit={handleSubmit}>
        <div>
          name
          <Select
            options={authorsOptions}
            value={nameOption}
            onChange={setNameOption} />
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

      <BirthYear authors={authors} />
    </div>
  )
}

export default Authors
