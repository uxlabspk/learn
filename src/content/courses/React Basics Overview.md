---
title: React Basics Overview
description: Learn fundamental React concepts like state, effects, forms, routing, and data fetching.
track: React Basics
order: 5
minutes: 10
---

# React Fundamentals: Building Interactive Web Pages

Welcome to the world of React! React is a popular JavaScript library for building user interfaces. It helps us create dynamic and interactive web applications. This lesson will introduce you to some of the core concepts you need to start building with React.

## State with useState

State is how React keeps track of data that changes over time. Think of state as the memory of your component. When the state changes, React automatically updates the part of the screen that needs to be redrawn. We use the `useState` hook to manage state in functional components.

The `useState` hook gives us two things: the current state value and a function to update that value.

Here is a simple example of how to use `useState` to track a counter:

```javascript
import React, { useState } from 'react';

function Counter() {
  // Initialize state: count starts at 0, and setCount is the function to change it
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Counter;
```

When you click the button, `setCount` updates the `count` variable, and React re-renders the component to show the new number. Remember, always update state immutably—meaning you create a *new* state value instead of changing the old one directly.

## Side Effects with useEffect

Sometimes, your component needs to do something outside of just rendering, like fetching data from an API or setting up subscriptions. These actions are called "side effects." We use the `useEffect` hook for this.

`useEffect` lets you run code after rendering. It is very useful for data fetching.

A basic structure looks like this:

```javascript
import React, { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // This code runs after every render by default
    console.log("Component rendered or updated!");
    fetch('some_api_url')
      .then(res => res.json())
      .then(data => setData(data));
  }); // The empty dependency array means it runs once after the initial render

  return <div>{data ? 'Data loaded!' : 'Loading...'}</div>;
}

export default DataFetcher;
```

The part inside `useEffect` is your side effect. If you pass an empty array (`[]`) as the second argument, the effect will only run once, similar to when a component first loads. If you provide an array with variables (like `[userId]`), the effect will re-run whenever those variables change.

## Handling Forms in React

Building forms is a common task. In React, we use *controlled components* for forms. A controlled component is one where the input's value is controlled by React state. This means React holds the current value of the input, and you update that state whenever the user types.

We use the `value` prop and the `onChange` event handler for this.

```javascript
import React, { useState } from 'react';

function SimpleForm() {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value); // Update state with the input's current value
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the browser from reloading the page
    alert(\`Hello, \${name}!\`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}         // The input's value is controlled by the 'name' state
        onChange={handleChange} // When the user types, update the 'name' state
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default SimpleForm;
```

## Next Steps

Now that you understand how to manage data (state), perform actions (effects), and handle user input (forms), you are ready for the next big step: navigating between different pages in your application using React Router.