const { GraphQLError } = require('graphql')
const Person = require('./models/person')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()

const resolvers = {
    Query: {
        personCount: async () => Person.collection.countDocuments(),
        allPersons: async (root, args) => {
            if (!args.phone) {
                return Person.find({})
            }
            return Person.find({ phone: { $exists: args.phone === 'YES' } })
        },
        findPerson: async (root, args) =>
            Person.findOne({ name: args.name }),
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Person: {
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        }
    },
    Mutation: {
        addPerson: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name
                    },
                })
            }

            const person = new Person({ ...args })
            try {
                await person.save()
                currentUser.friends = currentUser.friends.concat(person)
                await currentUser.save()
            } catch (error) {
                throw new GraphQLError('saving person failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error,
                    },
                })
            }

            pubsub.publish('PERSON_ADDED', { personAdded: person })

            return person
        },
        editNumber: async (root, args) => {
            const person = await Person.findOne({ name: args.name })
            person.phone = args.phone
            try {
                await person.save()
            } catch (error) {
                throw new GraphQLError('saving number failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error,
                    },
                })
            }
            return person
        },
        createUser: async (root, args) => {
            // Implementation for creating a user
            try {
                const user = new User({ username: args.username })
                return await user.save()
            } catch (error) {
                throw new GraphQLError('Creating the user failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.username,
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
        },
        addAsFriend: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                })
            }

            const isFriend = (person) => currentUser.friends
                .map(f => f._id.toString()).includes(person._id.toString())

            const personToAdd = await Person.findOne({ name: args.name })

            if (!isFriend(personToAdd)) {
                currentUser.friends = currentUser.friends.concat(personToAdd)
            }

            await currentUser.save()
            return currentUser
        },
    },
    Subscription: {
        personAdded: {
            subscribe: () => pubsub.asyncIterableIterator('PERSON_ADDED')
        }
    }
}

export default resolvers