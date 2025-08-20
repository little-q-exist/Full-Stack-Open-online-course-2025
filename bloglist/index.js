const app = require("./app");
const config = require('./utils/config')
const logger = require('./utils/logger')

const PORT = config.PORT || 3003
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
    logger.info(`localhost: http://localhost:3003/api/users`)
    logger.info(`http://localhost:3003/api/blogs`)
})
