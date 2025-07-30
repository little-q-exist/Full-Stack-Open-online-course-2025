import Header from './Header'
import Content from './Content'

const course = ({ course }) => {
    return (
        <div>
            <Header text={course.name} />
            <Content parts={course.parts} />
        </div>
    )

}

export default course