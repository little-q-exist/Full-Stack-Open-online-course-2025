const mongoose = require('mongoose')
const { ApolloServer } = require('@apollo/server')
const { v4: uuidv4 } = require('uuid')
const { startStandaloneServer } = require('@apollo/server/standalone')
const Book = require('./models/Book')
const Author = require('./models/Author')
const { GraphQLError } = require('graphql')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })


const typeDefs = `
    type Book {
        title: String!
        published: Int!
        author: Author!
        id: String!
        genres: [String!]!
    }

    type Author {
        name: String!
        bookCount: Int!
        id: String!
        born: Int
    }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre: [String!]): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
    ): Book
    editAuthor(
        name: String!
        setBornTo: Int!
    ): Author
  }
`

const resolvers = {
    Author: {
        bookCount: async (root) => {
            return await Book.find({ author: root.name }).countDocuments()
        }
    },

    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (_root, args) => {
            // 使用 MongoDB/Mongoose 在数据库层面进行筛选，避免内存中过滤
            const filter = {}


            /* 如果未来需要按作者精确匹配：
            if (args.author) {
                filter.author = { name: args.author }
            }
                */

            // genres: 传入的是一个字符串数组，需求为“任意一个匹配即可” => 使用 $in
            if (Array.isArray(args.genre) && args.genre.length > 0) {
                filter.genres = { $in: args.genre }
            }

            return Book.find(filter).populate('author')
        },
        allAuthors: () => Author.find({}),
    },

    Mutation: {
        addBook: async (root, args) => {
            const authorName = args.author
            const existedAuthor = await Author.findOne({ name: authorName })
            if (!existedAuthor) {
                const newAuthor = {
                    name: authorName,
                    id: uuidv4(),
                }
                const author = await new Author(newAuthor).save()
                const newBook = { ...args, author: author._id, id: uuidv4() }

                try {
                    return await new Book(newBook).save()
                } catch (error) {
                    throw new GraphQLError('Book title must be unique and at least 5 characters long.', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.title,
                            error,
                        },
                    })
                }
            }
            const newBook = { ...args, author: existedAuthor._id, id: uuidv4() }

            try {
                return await new Book(newBook).save()
            } catch (error) {
                throw new GraphQLError('Book title must be unique and at least 5 characters long.', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.title,
                        error,
                    },
                })
            }
        },
        editAuthor: async (root, args) => {
            const author = await Author.findOne({ name: args.name })
            author.born = args.setBornTo
            try {
                return await author.save()
            } catch (error) {
                throw new GraphQLError('Author name must be unique and at least 4 characters long.', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error,
                    },
                })
            }
        }
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})