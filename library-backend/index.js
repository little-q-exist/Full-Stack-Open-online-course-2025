const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { ApolloServer } = require('@apollo/server')
const { v4: uuidv4 } = require('uuid')
const { startStandaloneServer } = require('@apollo/server/standalone')
const Book = require('./models/Book')
const User = require('./models/User')
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
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }

    type Author {
        name: String!
        bookCount: Int!
        born: Int
        id: ID!
    }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre: [String!]): [Book!]!
    allAuthors: [Author!]!
    me: User
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
    createUser(
        username: String!
        favoriteGenre: String!
    ): User
    login(
        username: String!
        password: String!
    ): Token
  }
`

const resolvers = {
    Author: {
        bookCount: async (root) => {
            // DEBUG:_id
            return await Book.find({ author: root._id }).countDocuments()
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
        allAuthors: async () => {
            return await Author.find({})
        },
        me: (root, args, context) => {
            return context.currentUser
        }
    },

    Mutation: {
        addBook: async (root, args, context) => {
            if (!context.currentUser) {
                throw new GraphQLError('not authenticated')
            }

            let author = await Author.findOne({ name: args.author })

            if (!author) {
                const newAuthor = {
                    name: args.author,
                }
                author = await new Author(newAuthor).save()
            }
            const newBook = { ...args, author: author._id }

            try {
                const book = await new Book(newBook).save()
                return Book.findOne({ _id: book._id }).populate('author')
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
        editAuthor: async (root, args, context) => {
            if (!context.currentUser) {
                throw new GraphQLError('not authenticated')
            }

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
        },
        createUser: async (root, args) => {
            try {
                const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
                return await user.save()
            } catch (error) {
                throw new GraphQLError('Creating the user failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        error,
                    },
                })
            }
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            if (!user || args.password !== 'secret') {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }
            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        }
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), process.env.JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})