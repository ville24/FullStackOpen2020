import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick,text}) => {
  return (
  <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  
  if (good===0 && neutral === 0 && bad ===0) return (
      <p>No feedback given</p>
  )

  return (
      <table>
        <tbody>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value ={neutral} />
          <StatisticLine text="bad" value ={bad} />
          <StatisticLine text="all" value ={good+neutral+bad} />
          <StatisticLine text="average" value ={(good-bad)/(good+neutral+bad)} />
          <StatisticLine text="positive" value ={100*good/(good+neutral+bad)+' %'} />
        </tbody>
      </table>
  )
}

const StatisticLine = ({text,value}) => {
  return (
    <tr><td>{text} </td><td>{value}</td></tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodToValue = newValue => {
    setGood(newValue)
  }

  const setNeutralToValue = newValue => {
    setNeutral(newValue)
  }

  const setBadToValue = newValue => {
    setBad(newValue)
  }

  return (
    
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={() => setGoodToValue(good+1)} text="good"></Button>
      <Button handleClick={() => setNeutralToValue(neutral+1)} text="neutral"></Button>
      <Button handleClick={() => setBadToValue(bad+1)} text="bad"></Button>
      
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)