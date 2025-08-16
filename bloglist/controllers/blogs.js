const blogRouter = require('express').Router()
const Blog = require('../models/blogs')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.status(200).json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.title || !body.url) {
        return response.status(400).send({ error: 'missing title or url' })
    }

    const blog = new Blog(body)

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

module.exports = blogRouter