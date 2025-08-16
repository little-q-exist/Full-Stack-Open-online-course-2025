const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const assert = require('node:assert')
const { test, describe, after, beforeEach, it } = require('node:test')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const { expect } = require('chai')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObject = helper.blogs.map(blog => new Blog(blog))
    const promiseArray = blogObject.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('Get request', () => {
    test('can fetch all blogs', async () => {
        const blogs = await helper.blogsInDB()

        const response = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(blogs.length, response.body.length)
    })
})

test('the unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs')
    expect('id' in response.body[0]).to.be.true
})

describe('POST request', () => {
    test('a new blog can be post', async () => {

        const blogsAtStart = await helper.blogsInDB()

        const aNewBlog = helper.listWithOneBlog[0]
        await api
            .post('/api/blogs')
            .send(aNewBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDB()

        assert.strictEqual(blogsAtStart.length + 1, blogsAtEnd.length)

        const titles = blogsAtEnd.map(blog => blog.title)
        assert(titles.includes(aNewBlog.title))
    })
})

after(async () => {
    await mongoose.connection.close()
})