---
title: State with useState
description: Learn how React components remember and update data using the useState hook.
track: React Basics
order: 1
minutes: 8
---

## What Is React?

React is a JavaScript library for building user interfaces out of reusable pieces called **components**. Instead of manually selecting and updating HTML elements (as you did with the DOM in earlier lessons), React lets you describe what the interface *should* look like for any given piece of data, and it handles updating the actual page for you.

## What Is State?

**State** is data that a component needs to remember, and that can change over time — like whether a menu is open, what a user has typed, or how many times a button has been clicked. When state changes, React automatically re-renders the component to reflect the new value.

## Introducing useState

`useState` is a **hook** — a special function that lets components use React features like state. It's imported from React:

```js
import { useState } from "react";
```

Calling `useState` gives you two things: the current value of a piece of state, and a function to update it. The convention is to use array destructuring (from an earlier lesson) to grab both at once:

```js
const [count, setCount] = useState(0);
```

Here, `count` is the current value (starting at `0`, the value passed into `useState`), and `setCount` is the function used to change it. By convention, the update function is named `set` followed by the state name.

## A Complete Example: A Counter

```jsx
import { useState } from "react";

function Counter() {
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
```

Every time the button is clicked, `setCount(count + 1)` runs, updating the state. React then automatically **re-renders** the component — running the function again from top to bottom — so the displayed count updates on screen.

## Why "Re-render"?

Unlike the DOM manipulation you learned earlier, you never directly change the text on screen. Instead, you update the state, and React figures out what changed and updates only the necessary parts of the page. This is a fundamentally different mental model: describe *what* the UI should look like for a given state, not *how* to change it step by step.

## Updating State Immutably

A critical rule: never modify state directly. Always use the setter function, and when working with objects or arrays, always create a *new* copy rather than editing the original:

```js
// Wrong: mutating state directly
const [user, setUser] = useState({ name: "Amara", age: 29 });
user.age = 30; // don't do this

// Right: create a new object with the change
setUser({ ...user, age: 30 });
```

The `...user` syntax is called the **spread operator** — it copies all existing properties from `user` into a brand-new object, and `age: 30` then overwrites just that one property. React relies on detecting that the state object is genuinely new in order to know it needs to re-render; mutating the original object in place can cause React to silently miss the update.

## Multiple Pieces of State

A component can call `useState` as many times as needed, one for each independent piece of data:

```js
const [name, setName] = useState("");
const [age, setAge] = useState(0);
```

## What's Next

You now know how components remember and update data. But some tasks — like fetching data when a component first appears, or setting up a timer — need to happen in response to something other than a direct click. The next lesson covers `useEffect`, React's tool for handling these side effects.
