import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  
  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }


  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({name, value, unit}) => {
  return(
    <tr>
      <td>{name}</td>
      <td>{Math.round(value * 100) / 100} {unit}</td>
    </tr>
  )
}


const Statistics = ({good, neutral, bad}) => {
  if((good + neutral + bad) === 0){
    return(
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
  return(
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine name='good' value={good} unit="" />
          <StatisticLine name='neutral' value={neutral} unit=""/>
          <StatisticLine name='bad' value={bad} unit="" />
          <StatisticLine name='average' value={(good - bad)/(good + neutral + bad)} unit="" />
          <StatisticLine name='positive' value={good / (good + neutral + bad) * 100} unit="%" />
        </tbody>
      </table>
      
    </>
  )
  
}


ReactDOM.render(<App />, 
  document.getElementById('root')
)
