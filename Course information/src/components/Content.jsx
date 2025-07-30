import Part from './Part'

const Content = ({ parts }) => {
    const total = parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)

    return <div>
        {parts.map(part =>
            <Part content={part} key={part.id} />
        )}
        <h4>total of {total} exercises</h4>
    </div>
}

export default Content