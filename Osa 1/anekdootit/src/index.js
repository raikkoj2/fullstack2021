import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0))
  const [mostVotes, setMostVotes] = useState(0)
  
  const handleNext = () => {
    let next = selected
    while(next === selected){
      next = Math.floor(Math.random() * props.anecdotes.length)
    }
    setSelected(next)
  }

  const handleVote = () => {
    // set new points
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)

    //set new index for most points
    for(let i = 0; i < props.anecdotes.length; i++){
      if(copy[i] > copy[mostVotes]) {
        setMostVotes(i)
      }
    }
    
  }

  return (
    <>
      <h1>
        Anecdote of the day
      </h1>
      <div>
        {props.anecdotes[selected]}
      </div>
      <div>
        has {points[selected]} votes
      </div>
      <Button onClick={handleVote} text='vote' />
      <Button onClick={handleNext} text='next anecdote' />

      <h1>
        Anecdote with most votes
      </h1>
      <div>
        {props.anecdotes[mostVotes]}
      </div>
      <div>
        has {points[mostVotes]} votes
      </div>
    </>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)