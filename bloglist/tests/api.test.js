const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
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

describe('GET request', () => {
    test('can fetch all blogs', async () => {
        const blogs = await helper.blogsInDB()

        const response = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(blogs.length, response.body.length)
    })

    test('the unique identifier property is named id', async () => {
        const response = await api.get('/api/blogs')
        expect('id' in response.body[0]).to.be.true
    })
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

    test('like property default zero if missing', async () => {
        const aNewBlog = helper.listWithOneBlog[0]

        expect('likes' in aNewBlog).to.be.false

        const returnedBlog = await api
            .post('/api/blogs')
            .send(aNewBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDB()

        const addedBlog = await blogsAtEnd.find(blog => returnedBlog.body.id === blog.id)

        expect('likes' in addedBlog).to.be.true

        expect(addedBlog).to.have.property('likes').that.is.a('number').and.equals(0)
    })

    test('title and url are required or 400 BAD', async () => {
        const badBlog = {
            author: "little-q",
            likes: 1
        }

        expect(badBlog).to.not.has.property('title')
        expect(badBlog).to.not.has.property('url')

        await api
            .post('/api/blogs')
            .send(badBlog)
            .expect(400)


        const blogsAtEnd = await helper.blogsInDB()

        assert.strictEqual(blogsAtEnd.length, helper.blogs.length)
    })
})

describe('DELETE request', () => {
    test('a note can be deleted with 204', async () => {
        const blogsAtStart = await helper.blogsInDB()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDB()
        const titles = blogsAtEnd.map(blog => blog.title)

        assert(!titles.includes(blogToDelete.title))

        assert.strictEqual(blogsAtStart.length - 1, blogsAtEnd.length)
    })
})

describe('PUT request', () => {
    test.only('update a note and add a like', async () => {
        const blogsAtStart = await helper.blogsInDB()
        const blogToUpdate = blogsAtStart[0]

        const NewBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(NewBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDB()
        const blogUpdated = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

        assert.strictEqual(blogToUpdate.likes + 1, blogUpdated.likes)
    })
})

after(async () => {
    await mongoose.connection.close()
})