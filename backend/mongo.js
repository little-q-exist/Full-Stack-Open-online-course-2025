const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('password should be given as a argument');
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://little_q_exist:${password}@cluster0.ifobgfn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note);
    })
    mongoose.connection.close()
})
