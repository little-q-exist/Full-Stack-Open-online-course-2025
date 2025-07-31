const Display = ({ person }) => <li>{person.name} {person.number}</li>

const Person = ({ personToShow }) => {
    return (
        <div>
            <ul>
                {personToShow.map(person => <Display person={person} key={person.id} />)}
            </ul>
        </div>
    )
}

export default Person