import { useQuery } from '@apollo/client'

import { useState } from 'react'

import { ALL_BOOKS } from '../queries'

const Books = () => {
  // TODO: query for all books
  const result = useQuery(ALL_BOOKS)

  const [genreFilter, setGenreFilter] = useState('')

  if (result.loading) {
    return null
  }

  const books = result.data.allBooks

  const allGenres = [...new Set(books.flatMap(book => book.genres))]

  const booksToShow = books.filter(book =>
    genreFilter ? book.genres.includes(genreFilter) : true
  )

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {allGenres.map(genre => (
          <button key={genre} onClick={() => setGenreFilter(genre)} >{genre}</button>
        ))}
        <button onClick={() => setGenreFilter('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
