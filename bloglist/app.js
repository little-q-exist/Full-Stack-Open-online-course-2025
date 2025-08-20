const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const userRouter = require('./controllers/users')

const app = express()


const mongoUrl = config.MONGODB_URI
mongoose
    .connect(mongoUrl)
    .then(() => {
        logger.info('sucessful connected to DataBase')
    })
    .catch((error) => {
        logger.error(`connection failed: ${error.message}`)
    })

app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

module.exports = app