# CS394 useEffect Lab: Working with REST APIs in React

## Learning Objectives

By the end of this lab, students will be able to:

- Implement the `useEffect` React hook to fetch data from REST APIs
- Handle component lifecycle events properly with useEffect
- Manage state for both individual and collection data fetching
- Implement proper error handling and loading states for asynchronous operations
- Apply TypeScript typing to React components and API data

## Introduction to React Hooks

React Hooks are functions that enable functional components to "hook into" React features like state and life-cycle methods. They provide a more flexible and straightforward way to manage component logic, allowing developers to encapsulate behavior within functional components without using class syntax.

Introduced in React 16.8, hooks revolutionized React development by allowing function components to use state and lifecycle features that were previously only available in class components. The true power of hooks comes not just from using them individually, but from composing them together to create elegant solutions to complex problems.

For this lab, we'll focus on two of the most important hooks:

1. **useState**: Manages state within functional components
2. **useEffect**: Handles side effects like data fetching and subscriptions

### Essential React Hooks Resources:

- [React Official Hooks Documentation](https://react.dev/reference/react/hooks)
- [Introduction to Hooks](https://legacy.reactjs.org/docs/hooks-intro.html) - Comprehensive explanation of why hooks were created
- [FreeCodeCamp's Guide to React Hooks](https://www.freecodecamp.org/news/full-guide-to-react-hooks/) - Detailed tutorial with examples
- [TypeScript with React Hooks Guide](https://www.totaltypescript.com/tutorials/react-with-typescript) - Interactive tutorial for TypeScript + React

## Overview

In this lab, you will develop a React application in TypeScript that interacts with a REST API. You'll create components that fetch and display both a collection of todos and individual todo items from the JSONPlaceholder API.

## Getting Started

### Prerequisites

- Git command line tools
- Node.js and npm installed
- Visual Studio Code

### Setup Instructions

1. Accept the GitHub Classroom assignment link provided by your instructor
2. Clone the repository to your local machine using the instructions from github classroom.
3. Open the project in Visual Studio Code
4. Install the required dependencies by running:
   ```bash
   npm install
   ```
5. run tests. most will fail
   ```bash
   npm test
   ```
   This will run the test suite and show you which tests are failing. You can use this information to guide your implementation. I recommend starting with todo-list.test.tsx before moving on to todo-detail.test.tsx.
   implement the fetch
6. To check if your solution will pass the automated grading, run:
   ```bash
   npm run grade
   ```

## Lab Requirements

You'll be implementing two main components:

### 1. TodoList Component

Create a component that fetches and displays all todos from the API endpoint: https://jsonplaceholder.typicode.com/todos

you can open this url in a browser to see the data structure.

Requirements:

- Use the `useEffect` hook to fetch data when the component mounts
- Display the list of todos with at least their title and completion status
- Implement loading and error states
- Add TypeScript interfaces for the todo data structure
- Implement filter buttons ("All", "Open", "Completed") to filter the todo list based on completion status
- Apply proper styling to show which filter is currently active
- Implement the filtering functionality client-side without making additional API calls when filters are changed

### 2. TodoDetail Component

Create a component that fetches and displays a single todo item based on an ID

Requirements:

- Accept a todo ID as a prop
- Use `useEffect` to fetch the specific todo when the component mounts or when the ID changes
- Display all relevant details of the todo
- Implement loading and error states
- Add proper TypeScript typing

### 3. Bonus Challenge (Optional)

Implement a feature that allows toggling between the list view and detail view of a selected todo.

## Tasks

1. Review the provided project structure and familiarize yourself with the template code
2. Define TypeScript interfaces for the Todo data structure
3. Implement the TodoList component with useEffect for data fetching
4. Implement the TodoDetail component with useEffect
5. Connect the components in the main App component
6. Ensure all tests pass by running `npm test` and `npm run grade`

## Submission Guidelines

1. Commit your changes regularly with descriptive commit messages
2. Push your final solution to your GitHub repository
3. Ensure all tests are passing before submission
4. The assignment will be automatically graded based on passing test criteria

## Understanding Closures and useEffect

One of the most common pitfalls when working with useEffect is dealing with stale closures. Understanding JavaScript closures is essential for properly implementing useEffect in React.

### What are Closures?

A closure is a function bundled together with references to its surrounding state (the lexical environment). In JavaScript, closures are created every time a function is created. This means that functions defined inside React components can access and "remember" variables from their outer scope.

### Stale Closures in useEffect

Stale closures occur when the remembered data becomes outdated due to the asynchronous nature of JavaScript. This commonly happens in scenarios involving data fetching or timers within React components. When your useEffect code captures variables from the component scope and those variables change, the effect might still be referencing old values.

### Example of a Stale Closure Problem

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  // This effect has a stale closure problem
  useEffect(() => {
    const timer = setInterval(() => {
      console.log(`Current count: ${count}`);
      setCount(count + 1); // This will always use the initial value of count
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Empty dependency array

  return <div>{count}</div>;
}
```

In this example, the count variable is captured in the closure when the effect runs, but because the dependency array is empty, the effect never re-runs with updated values. This means the interval will always increment from the initial value.

### How to Fix Stale Closures

To fix stale closures in React components:

1. List all necessary dependencies in the useEffect dependency array
2. Use functional updates for state setters
3. Clear timers and intervals in the cleanup function

Corrected example:

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  // Fixed version using a functional update
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount + 1); // Functional update doesn't rely on closed-over value
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Empty dependency array is now fine

  return <div>{count}</div>;
}
```

## Resources on useEffect

Here are some helpful resources to understand React's useEffect hook:

1. [React Official Documentation on useEffect](https://react.dev/reference/react/useEffect)
2. [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/) - Dan Abramov's comprehensive guide
3. [React's useEffect: Best Practices and Common Pitfalls](https://www.palo-it.com/en/blog/stale-closures-impact-on-react-components) - Article on stale closures in React
4. [Fantastic Closures and How to Find Them in React](https://www.developerway.com/posts/fantastic-closures) - Understanding closures in React
5. [Using the Effect Hook - React Legacy Docs](https://legacy.reactjs.org/docs/hooks-effect.html) - Detailed explanation of useEffect

## useEffect Pitfalls to Watch Out For

1. **Infinite Loops**: Not specifying the dependency array or incorrectly including changing values can cause infinite render loops
2. **Stale Closures**: Be careful with values from outside the effect that change over time
3. **Race Conditions**: When multiple API calls are made in quick succession, results may return out of order
4. **Missing Cleanup**: Always clean up subscriptions or timers to prevent memory leaks
5. **Over-fetching**: Be mindful of when effects run to avoid unnecessary API calls

## Testing Your Solution

Run the test suite to check if your implementation meets the requirements:

```bash
npm test
```

For validation against the automated grading criteria:

```bash
npm run grade
```

All tests should pass for your solution to be considered complete.
