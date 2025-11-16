const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
const Content = (props) => {
  console.log(props)
  const contentParts= props.contentParts 

  return (
    <div>
      <p>
        {contentParts[0].part} {contentParts[0].exercises}
      </p>
      <p>
        {contentParts[1].part} {contentParts[1].exercises}
      </p>
      <p>
        {contentParts[2].part} {contentParts[2].exercises}
      </p>
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
