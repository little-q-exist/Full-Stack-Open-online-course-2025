const mongoose = require('mongoose')
const Blog = require('../models/blog')
const config = require('../utils/config')

const migrateCommentField = async () => {
    try {
        const mongoUrl = config.MONGODB_URI
        mongoose
            .connect(mongoUrl)
            .then(() => {
                console.log('sucessful connected to DataBase')
            })
            .catch((error) => {
                console.error(`connection failed: ${error.message}`)
            })

        const result = await Blog.updateMany(
            { comment: { $exists: false } },
            { $set: { comment: [] } }
        )

        console.log(`updated ${result.nModified} datas`);
        mongoose.connection.close()

    } catch (error) {
        console.error('failed to operate');
        mongoose.connection.close()
    }
}

migrateCommentField()