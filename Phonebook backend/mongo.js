const mongoose = require('mongoose')

if (process.argv.length === 3 || process.argv.length === 5) {
    const password = process.argv[2]
    const url = `mongodb+srv://little_q_exist:${password}@cluster0.ifobgfn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

    mongoose.set('strictQuery', false)

    mongoose.connect(url)

    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
    })

    const Person = mongoose.model('Person', personSchema)

    if (process.argv.length === 3) {
        Person
            .find({})
            .then(persons => {
                console.log('Phonebook: ');

                persons.forEach(people => {
                    console.log(people.name, people.number);
                })
                mongoose.connection.close()
            })
    } else {
        const person = new Person({
            name: process.argv[3],
            number: process.argv[4]
        })

        person.save().then(result => {
            console.log('added', result.name, 'number', result.number, 'to the phonebook.');
            mongoose.connection.close()
        })
    }
} else {
    console.log('The argument should be 3 or 5.');
    console.log('node mongo.js <yourpassword> (<name> <number>)');
    process.exit(1)
}