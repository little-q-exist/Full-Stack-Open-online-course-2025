import Part from './Part'

const Content = ({ parts }) => {
    return <div>
        {parts.map(part =>
            <Part content={part} key={part.id} />
        )}
    </div>
}

export default Content