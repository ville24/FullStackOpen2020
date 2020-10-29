import React from 'react'

const Course = ({course}) => 
  <div>
    <Header title={course.name}></Header>
    <Content parts={course.parts}></Content>
    <Footer parts={course.parts}></Footer>
  </div>

const Header = ({title}) => <h2>{title}</h2>

const Content = ({parts}) => 
  <div>
    {parts.map((part,i) => 
      <Part key={part.id} name={part.name} exercises={part.exercises}></Part>)}
  </div>


const Part = ({id, name, exercises}) => <p>{name} {exercises}</p>

const Footer = ({parts}) => {
  const sum = parts.reduce((acc, cur) => {
      return ({exercises: acc.exercises + cur.exercises})
    }
  )
  return (
    <div><b>total of {sum.exercises} exercises</b></div>
  )
}

export default Course
