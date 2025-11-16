const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  console.log(props)
    const contentParts = props.contentParts

  return (
    <div>
      <Part name={contentParts[0].part} exercises={contentParts[0].exercises}/>
      <Part name={contentParts[1].part} exercises={contentParts[1].exercises}/>
      <Part name={contentParts[2].part} exercises={contentParts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  const contentParts = props.contentParts
  const total = contentParts[0].exercises + contentParts[1].exercises + contentParts[2].exercises

  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

const App = () => {
  const course = "Half Stack application development"
  const contentParts = [
    { part: 'Fundamentals of React', exercises: 10 },
    { part: 'Using props to pass data', exercises: 7 },
    { part: 'State of a component', exercises: 14 }
  ]

  return (
    <div>
      <Header course={course} />
      <Content contentParts={contentParts} />
      <Total contentParts={contentParts} />
    </div>
  )
}

export default App
