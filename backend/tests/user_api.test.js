const bcrypt = require('bcrypt')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const { beforeEach, test, after, describe } = require('node:test')
const assert = require('node:assert')
const helper = require('./test_helper')
const mongoose = require('mongoose')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
})

describe('when there is initially one user in db', () => {


    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDB()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDB()

        assert.strictEqual(usersAtStart.length + 1, usersAtEnd.length)

        const usernames = usersAtEnd.map(user => user.username)
        assert(usernames.includes(newUser.username))
    })

    test.only('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDB()
        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDB()

        console.log(result.body);


        assert.strictEqual(usersAtStart.length, usersAtEnd.length)

        assert(result.body.error.includes('expected `username` to be unique'))
    })
})

after(async () => {
    await mongoose.connection.close()
})