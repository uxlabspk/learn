---
title: Side Effects with useEffect
description: Run code in response to component changes using the useEffect hook and cleanup.
track: React Basics
order: 2
minutes: 8
---

## What Is a Side Effect?

A **side effect** is anything a component does that reaches outside of simply calculating what to display — fetching data from a server, setting a timer, subscribing to an event, or manually changing something outside React's control. React provides a dedicated hook for these situations: `useEffect`.

## The Basic Shape

```jsx
import { useState, useEffect } from "react";

function Welcome() {
  useEffect(() => {
    console.log("Component rendered!");
  });

  return <h1>Hello!</h1>;
}
```

`useEffect` takes a function as its first argument, and that function runs *after* React has updated the page. Without any further configuration, this runs after every single render — which is often more often than you want.

## Controlling When It Runs: The Dependency Array

The **dependency array** is the second, optional argument to `useEffect`. It tells React exactly when the effect should re-run.

```jsx
useEffect(() => {
  console.log("This runs once, when the component first appears");
}, []);
```

An **empty array** `[]` means "run this effect only once, right after the first render, and never again." This is the most common pattern for fetching initial data.

```jsx
useEffect(() => {
  console.log(`Count changed to ${count}`);
}, [count]);
```

Including a variable in the array — here, `count` — means "re-run this effect whenever `count` changes." If you omit the array entirely, the effect runs after *every* render, which is rarely what you want and can create performance problems.

## A Practical Example: Fetching Data

Combining `useEffect` with `useState` and `fetch` (from an earlier lesson) is one of the most common patterns in React:

```jsx
import { useState, useEffect } from "react";

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://api.example.com/user/1")
      .then(response => response.json())
      .then(data => setUser(data));
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return <h2>{user.name}</h2>;
}
```

The empty dependency array ensures this fetch happens exactly once, when the component first appears — not on every re-render, which would trigger endless repeated network requests.

## Cleanup Functions

Some effects need to be "undone" when a component disappears or before the effect runs again — like clearing a timer or removing an event listener. You do this by **returning a function** from inside your effect:

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Tick");
  }, 1000);

  return () => {
    clearInterval(timer);
  };
}, []);
```

This returned function is called the **cleanup function**. React automatically runs it right before the component is removed from the page (or before the effect runs again, if its dependencies change). Without this cleanup, the timer would keep running even after the component is gone — a common source of bugs called a **memory leak**.

## A Simple Rule of Thumb

If your effect sets something up that needs to be torn down — a timer, a subscription, an event listener — return a cleanup function. If it's a one-time action with nothing to undo, like a single fetch, you can skip the cleanup.

## What's Next

You now know how to manage state and side effects. Next, you'll apply both of these skills to one of the most common UI patterns on the web: forms — capturing what a user types and responding when they submit it.
