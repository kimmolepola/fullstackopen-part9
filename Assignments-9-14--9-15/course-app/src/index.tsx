import React from "react";
import ReactDOM from "react-dom";

interface CoursePartWithDescription extends CoursePartBase {
  name: string;
  description: string;
}
// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CoursePartWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartWithDescription {
  name: "Course four";
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  },
  {
    name: "Course four",
    exerciseCount: 4,
    description: "This is course four"
  }
];

const Total: React.FC<{ courseParts: Array<CoursePart> }> = ({ courseParts }) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discrimination union member: ${JSON.stringify(value)}`
  )
}

const Part: React.FC<{ coursePart: CoursePart }> = ({ coursePart }) => {
  switch (coursePart.name) {
    case "Deeper type usage":
      return (
        <p>
          {coursePart.name} - Exercise count: {coursePart.exerciseCount} - Description: {coursePart.description} - Exercise submission link: {coursePart.exerciseSubmissionLink}
        </p>
      )
    case "Fundamentals":
      return (<p>
        {coursePart.name} - Exercise count: {coursePart.exerciseCount} - Description: {coursePart.description}
      </p>
      )
    case "Using props to pass data":
      return (<p>
        {coursePart.name} - Exercise count: {coursePart.exerciseCount} - Group project count: {coursePart.groupProjectCount}
      </p>
      )
    case "Course four":
      return (
        <p>
          {coursePart.name} - Exercise count: {coursePart.exerciseCount} - Description: {coursePart.description}
        </p>
      )
    default:
      return assertNever(coursePart);
  }
}

const Content: React.FC<{ courseParts: Array<CoursePart> }> = ({ courseParts }) => {
  return (
    <div>
      <Part coursePart={courseParts[0]} />
      <Part coursePart={courseParts[1]} />
      <Part coursePart={courseParts[2]} />
      <Part coursePart={courseParts[3]} />
    </div>
  )
};

const Header: React.FC<{ courseName: string }> = ({ courseName }) => {
  return (
    <div>
      <h1>{courseName}</h1>
    </div>
  )
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));