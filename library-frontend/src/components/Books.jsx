import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = () => {
  // TODO: query for all books
  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return null
  }

  const books = result.data.allBooks

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
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
