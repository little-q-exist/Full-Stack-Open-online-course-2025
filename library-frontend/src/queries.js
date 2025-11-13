import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query AllAuthors{
    allAuthors {
        name
        born
        bookCount
    }
}
`

export const ALL_BOOKS = gql`
query AllBooks {
  allBooks {
    title
    published
    author {
      name
      bookCount
      born
      id
    }
    genres
    id
  }
}
`

export const ADD_BOOK = gql`
mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    title
    published
    author {
      name
      bookCount
      born
      id
    }
    genres
    id
  }
}

`

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
      bookCount
    }
}
`
export const CREATE_USER = gql`
mutation CreateUser($username: String!, $favoriteGenre: String!) {
  createUser(username: $username, favoriteGenre: $favoriteGenre) {
    username
    favoriteGenre
    id
  }
}
`

export const LOGIN = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`