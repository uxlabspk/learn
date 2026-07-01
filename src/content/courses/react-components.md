---
title: Your First Component
description: What a component actually is, and how to build one from scratch.
track: React Basics
order: 1
minutes: 12
pdf: /pdfs/react-components-cheatsheet.pdf
---

React apps are built entirely out of **components** — small, self-contained pieces of UI that you can combine like building blocks.

## A minimal component

```jsx
function WelcomeCard() {
  return (
    <div className="card">
      <h2>Welcome!</h2>
      <p>Glad you're here.</p>
    </div>
  );
}
```

A component is just a JavaScript function that returns markup. That markup is written in **JSX**, which looks like HTML but is actually JavaScript underneath.

## Using props

Props let a component receive information from its parent, the same way a function receives arguments.

```jsx
function WelcomeCard({ name }) {
  return <h2>Welcome, {name}!</h2>;
}

<WelcomeCard name="Bilal" />
```

## Why components matter

Instead of one giant page of markup, you get small, testable, reusable pieces — a `Button`, a `Navbar`, a `CourseCard` — that you assemble into full pages. This is the core idea you'll use in every React project from here on.
