const { test, describe, beforeEach, before, after } = require('node:test')
const User = require('../models/user')
const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const assert = require('node:assert')
const { expect } = require('chai')
const { default: mongoose } = require('mongoose')

const api = supertest(app)

describe('create a user, login and use token to add a blog', () => {
    before(async () => {
        await User.deleteMany({})
        await Blog.deleteMany({})
    })

    test('can create a user', async () => {
        const userToAdd = helper.oneUser

        const response = await api
            .post('/api/users')
            .send(userToAdd)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const usersAtEnd = await helper.usersInDB()

        assert.strictEqual(usersAtEnd.length, 1)

        const usernames = usersAtEnd.map(user => user.username)

        assert(usernames.includes(userToAdd.username))
    })

    let token = null

    test('can login and generate a token', async () => {
        const userToAdd = helper.oneUser

        const response = await api
            .post('/api/login')
            .send({
                username: userToAdd.username,
                password: userToAdd.password
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect('token' in response.body).to.be.true
        token = response.body.token
    })

    test('can add a blog with token', async () => {
        const blogToAdd = helper.listWithOneBlog[0]

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blogToAdd)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDB()

        assert.strictEqual(blogsAtEnd.length, 1)

        const titles = blogsAtEnd.map(blog => blog.title)

        assert(titles.includes(blogToAdd.title))
    })

    test('cannot post a blog without a token', async () => {
        const { _id, __v, ...blogToAdd } = helper.blogs[1]

        const blogsAtStart = await helper.blogsInDB()

        const response = await api
            .post('/api/blogs')
            .send(blogToAdd)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDB()

        assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)

        const titles = blogsAtEnd.map(blog => blog.title)

        assert(!titles.includes(blogToAdd.title))
    })
})

after(async () => {
    await mongoose.connection.close()
})