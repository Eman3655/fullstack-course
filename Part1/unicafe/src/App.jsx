import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const StatisticLine = props => <div>{props.text} {props.value}</div>

const Statistics = (props) => {
  const { good, neutral, bad } = props
  const total = good + neutral + bad
  if (total === 0) {
    return <p>No feedback given</p>
  }
  return (
    <div>
      <StatisticLine value={good} text="good" />
      <StatisticLine value={neutral} text="neutral" />
      <StatisticLine value={bad} text="bad" />
      <StatisticLine value={good + neutral + bad} text="all" />
      <StatisticLine value={(good - bad) / total} text="average" />
      <StatisticLine value={good / total * 100 + " %"} text="positive" />
    </div>

)
}

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
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App
