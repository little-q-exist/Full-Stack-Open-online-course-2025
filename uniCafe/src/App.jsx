import { useState } from 'react'

const Header = ({ text }) => (<h1>{text}</h1>)

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return <div>No feedback given</div>
  }
  return (
    <div>
      <Header text={"statistics"}></Header>
      <table>
        <StatisticsLine text={"good"} value={props.good}></StatisticsLine>
        <StatisticsLine text={"neutral"} value={props.neutral}></StatisticsLine>
        <StatisticsLine text={"bad"} value={props.bad}></StatisticsLine>
        <StatisticsLine text={"all"} value={props.total}></StatisticsLine>
        <StatisticsLine text={"average"} value={props.average}></StatisticsLine>
        <StatisticsLine text={"positive"} value={`${(props.positive * 100).toFixed(1)} %`}></StatisticsLine>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let total = good + neutral + bad
  let average = total === 0 ? 0 : (good - bad) / total
  let positive = total === 0 ? 0 : (good / total)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <Header text={"give feedback"}></Header>
      <Button handleClick={handleGoodClick} text={"good"}></Button>
      <Button handleClick={handleNeutralClick} text={"neutral"}></Button>
      <Button handleClick={handleBadClick} text={"bad"}></Button>
      <Statistics good={good} neutral={neutral} bad={bad}
        total={total} average={average} positive={positive}></Statistics>
    </div>
  )
}

export default App