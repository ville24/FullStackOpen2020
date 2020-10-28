import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick,text}) => {
  return (
  <button onClick={handleClick}>{text}</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({points:new Array(anecdotes.length).fill(0),mostVotes:0})


  const getRandomInt = (max) => {
    return (
      Math.floor(Math.random() * Math.floor(max))
  )}

  const addVote = (index) => {
    const copy = {...votes}
    copy.points[index] += 1
    copy.mostVotes=getMax(votes.points)
    setVotes(copy)
  }

  const getMax = (arr) => {
      var max = arr[0];
      var maxIndex = 0;
  
      arr.forEach((point,index) => {
        if (point > max) {
          maxIndex = index;
          max = point;
        }
      })
      return maxIndex;
  }
  

  return (
    <div>
      <h2>Anectode of the day</h2>
      {props.anecdotes[selected]}
      <div>
        <Button handleClick={()=>addVote(selected)} text="vote"></Button>
        <Button handleClick={()=>setSelected(getRandomInt(anecdotes.length))} text="next anecdote"></Button>
      </div>
      <h2>Anectode withmost votes</h2>
      <div>{props.anecdotes[votes.mostVotes]}</div>
      <div>has {votes.points[votes.mostVotes]} votes.</div>
    </div>
   
  )
}

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
