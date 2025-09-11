import Display from './component/Display'
import Button from './component/Button'

const App = () => {
    return (
        <div>
            <Display />
            <div>
                <Button type='INC' label='+' />
                <Button type='DEC' label='-' />
                <Button type='ZERO' label='0' />
            </div>
        </div>
    )
}

export default App