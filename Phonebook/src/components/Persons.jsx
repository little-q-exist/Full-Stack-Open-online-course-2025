const Display = ({ person, handleDelete }) => {

    return (
        <div>
            <li>{person.name} {person.number}</li>
            <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
        </div>
    )
}

const Person = ({ personToShow, handleDelete }) => {
    return (
        <div>
            <ul>
                {personToShow.map(person => <Display person={person} handleDelete={handleDelete} key={person.id} />)}
            </ul>
        </div>
    )
}

export default Person