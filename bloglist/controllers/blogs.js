const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.status(200).json(blogs)
})

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

blogRouter.post('/', async (request, response) => {
    const body = request.body

    const token = getTokenFrom(request)

    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'invalid token' })
    }

    const user = await User.findById(decodedToken.id)

    if (!user) {
        return response.status(401).json({ error: 'user NOT FOUND' })
    }

    if (!body.title || !body.url) {
        return response.status(400).send({ error: 'missing title or url' })
    }

    const blog = new Blog({ ...body, user: user._id })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    const id = request.params.id

    await Blog.findByIdAndDelete(id)

    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const { title, author, url, likes } = request.body

    const blog = await Blog.findById(id)

    if (!blog) {
        return response.status(404).json({ error: 'blog not found' })
    }

    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes

    const updatedBlog = await blog.save()
    response.json(updatedBlog)
})

module.exports = blogRouter