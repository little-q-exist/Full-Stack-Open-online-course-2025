import { RECOMMENDATION } from '../queries'

import { useQuery } from '@apollo/client'

const Recommendations = () => {
    const result = useQuery(RECOMMENDATION)

    if (result.loading) {
        return null
    }

    const favoriteGenre = result.data.me.favoriteGenre
    const books = result.data.allBooks

    const booksToShow = books.filter(book =>
        book.genres.includes(favoriteGenre)
    )

    if (!booksToShow) {
        return (
            <div>
                <h2>Recommended for You</h2>
                <p>No books available in your favorite genre {favoriteGenre}.</p>
            </div>
        )
    }

    return (
        <div>
            <h2>Recommended for You</h2>
            <p>Books for your favorite genre {favoriteGenre}</p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {booksToShow.map(book => (
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

export default Recommendations