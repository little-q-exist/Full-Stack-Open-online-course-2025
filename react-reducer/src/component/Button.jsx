import { useCounterDispatch } from '../CounterContext'

const Button = ({ type, label }) => {
    const counterDispatch = useCounterDispatch()
    return (
        <button onClick={() => { counterDispatch({ type: type }) }}>{label}</button>
    )
}

export default Button