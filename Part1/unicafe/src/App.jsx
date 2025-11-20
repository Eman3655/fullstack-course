import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const Display = props => <div>{props.text} {props.value}</div>
const Total = props => <div>{props.text} {props.value}</div>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Display value={good} text="good" />
      <Display value={neutral} text="neutral" />
      <Display value={bad} text="bad" />
      <Total value={good + neutral + bad} text="all" />
      <Total value={(good - bad) / (good + neutral + bad)} text="average" />
      <Total value={good / (good + neutral + bad) * 100 + " %"} text="positive" />
    </div>
  )
}

export default App
