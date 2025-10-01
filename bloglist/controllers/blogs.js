const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.status(200).json(blogs)
})


blogRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

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
    user.blogs = user.blogs.concat(savedBlog)
    await user.save()
    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    const id = request.params.id

    const blog = await Blog.findById(id)

    if (!blog) {
        return response.status(401).json({ error: 'invalid id' })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'invalid token' })
    }

    const user = await User.findById(decodedToken.id)

    if (user._id.toString() !== blog.user.toString()) {
        return response.status(401).json({ error: 'invalid user' })
    }

    await Blog.findByIdAndDelete(id)

    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const { title, author, url, likes } = request.body

    const blog = await Blog.findById(id).populate('user', { username: 1, name: 1 })

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

blogRouter.post('/:id/comment', async (request, response) => {
    const id = request.params.id
    const { content } = request.body

    const blog = await Blog.findById(id).populate('user', { username: 1, name: 1 })

    if (!blog) {
        return response.status(404).json({ error: 'blog not found' })
    }

    blog.comment = blog.comment.concat(content)

    const updatedBlog = await blog.save()
    response.json(updatedBlog)
})

module.exports = blogRouter