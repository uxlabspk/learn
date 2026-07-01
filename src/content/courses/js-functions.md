---
title: Functions and Scope
description: Package up logic you can reuse, and understand where your variables are visible.
track: JavaScript Fundamentals
order: 2
minutes: 10
---

A function is a reusable block of instructions. Instead of repeating code, you write it once and *call* it whenever you need it.

## Writing a function

```js
function greet(name) {
  return `Hello, ${name}!`;
}

greet("Ayesha"); // "Hello, Ayesha!"
```

Arrow functions are a shorter, common alternative:

```js
const greet = (name) => `Hello, ${name}!`;
```

## Scope: who can see what

A variable declared inside a function only exists inside that function.

```js
function calculateTotal() {
  const tax = 0.05;
  return 100 * (1 + tax);
}

console.log(tax); // ReferenceError: tax is not defined
```

This is called **local scope**, and it's a good thing — it keeps different parts of your program from accidentally interfering with each other.

## Why this matters

Functions are the building blocks of everything you'll write next: event handlers, API calls, and eventually entire React components are all just functions with a job to do.
