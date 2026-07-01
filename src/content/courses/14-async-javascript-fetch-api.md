---
title: Async JavaScript & Fetch API
description: Understand promises and async/await while fetching data with the Fetch API.
track: JavaScript Fundamentals
order: 3
minutes: 8
---

## The Problem: Things That Take Time

Most JavaScript code runs instantly, line by line. But some operations — like requesting data from a server over the internet — take an unpredictable amount of time. JavaScript can't just pause and wait, or the entire page would freeze. This is where **asynchronous** ("async") code comes in: code that can run in the background while the rest of the page stays responsive.

## Promises: A Placeholder for Future Data

A **promise** is an object representing a value that isn't ready yet, but will be at some point — either successfully (**resolved**) or unsuccessfully (**rejected**). Think of a promise like a restaurant buzzer: you don't have your food yet, but you have something that guarantees you'll be notified when it's ready.

You can work with a promise using `.then()`:

```js
fetch("https://api.example.com/users")
  .then(response => response.json())
  .then(data => console.log(data));
```

Each `.then()` runs once the previous step finishes, passing along its result.

## The Fetch API

`fetch()` is a built-in browser function for making network requests — most commonly, a **GET request**, which asks a server to send back data. Calling `fetch()` returns a promise.

```js
fetch("https://api.example.com/users")
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log("Something went wrong:", error);
  });
```

Note the two-step process: `fetch()` resolves first with a **response** object, but that response's body needs to be parsed separately with `.json()`, which itself returns another promise. `.catch()` handles any errors along the way, like a lost network connection.

## async/await: A Cleaner Syntax

Chains of `.then()` can get hard to read once you have several steps. `async` and `await` are modern syntax that let asynchronous code read almost like ordinary, step-by-step code.

```js
async function getUsers() {
  try {
    const response = await fetch("https://api.example.com/users");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Something went wrong:", error);
  }
}

getUsers();
```

A few rules to remember: `await` can only be used inside a function marked `async`. `await` pauses execution of *that function* (not the whole page) until the promise resolves, then hands you the resolved value directly — no `.then()` needed. Errors are caught using a `try/catch` block, just like in regular JavaScript.

## Which Style Should You Use?

Both `.then()` chains and `async/await` do the same thing under the hood — `async/await` is generally considered easier to read, especially once you have more than one asynchronous step in a row. Most modern JavaScript code favors `async/await`, though you'll encounter both styles when reading other developers' code.

## What's Next

You now understand how JavaScript handles operations that take time, like fetching data from a server. The final JavaScript lesson covers ES6 modules and modern syntax — tools like `import`/`export`, template literals, and destructuring that make your code cleaner and easier to organize across multiple files.
