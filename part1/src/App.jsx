import { useState } from 'react'

const History = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return (
      <p>The click history is empty.</p>
    )
  }
  return (
    <p>{allClicks.join(' ')}</p>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const useCounter = () => {
  const [value, setValue] = useState(0)

  const increase = () => {
    setValue(value + 1)
  }

  const decrease = () => {
    setValue(value - 1)
  }

  const zero = () => {
    setValue(0)
  }

  return {
    value,
    increase,
    decrease,
    zero
  }
}

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    value,
    type,
    onChange
  }
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  const [allClicks, setAll] = useState([])

  const counter = useCounter()

  const name = useField('text')

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }


  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }


  return (
    <div>
      {left}
      <Button onClick={handleLeftClick} text={"left"} />
      <Button onClick={handleRightClick} text={"right"} />
      {right}

      <History allClicks={allClicks} />

      <div>
        <div>{counter.value}</div>
        <button onClick={counter.increase}>
          plus
        </button>
        <button onClick={counter.decrease}>
          minus
        </button>
        <button onClick={counter.zero}>
          zero
        </button>
      </div>

      <div>
        <form >
          <input type={name.type} value={name.value} onChange={name.onChange} />
        </form>
      </div>

    </div>
  )
}
export default App