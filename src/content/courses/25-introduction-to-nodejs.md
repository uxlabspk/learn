---
title: Introduction to Node.js
description: Understand what Node.js is and how it lets JavaScript run outside the browser.
track: Backend with Node.js & Express
order: 1
minutes: 6
---

## JavaScript Outside the Browser

Until now, every bit of JavaScript in this course has run inside a web browser, manipulating a page a visitor is looking at. **Node.js** changes that — it's a **runtime** that lets JavaScript run directly on a computer, completely independent of any browser. This is what makes JavaScript usable for building servers, the programs that power the backend of websites.

A **runtime** is the environment that actually executes your code. The browser has its own JavaScript runtime built in; Node.js is a separate one you install on your computer, designed for running JavaScript outside a browser context entirely.

## Why This Matters

Before Node.js existed, JavaScript could only run in browsers. Backend development — the server-side logic that handles data, talks to databases, and serves pages — was typically done in other languages like Python, Ruby, or PHP. Node.js let developers use JavaScript on the backend too, meaning the same language can now power both sides of a web application.

## Running a JavaScript File with Node

Once Node.js is installed on your computer, running a JavaScript file is as simple as typing this in your terminal:

```
node app.js
```

This executes the code inside `app.js` directly, line by line, printing any `console.log()` output to your terminal instead of a browser's developer console.

```js
// app.js
console.log("Hello from Node.js!");

const name = "Amara";
console.log(`Welcome, ${name}`);
```

Running `node app.js` on this file prints both lines to your terminal — no browser required at all.

## What's Different From Browser JavaScript?

Most core JavaScript — variables, functions, arrays, objects, `if` statements — works identically in Node as it does in a browser, since it's the same language. But a few things differ. Node has no `document` or `window` objects, since there's no webpage or DOM to interact with. In exchange, Node provides its own built-in capabilities the browser doesn't have, like reading and writing files on your computer's hard drive.

## Modules in Node

Node organizes code into **modules** — separate files that can share functionality with each other, similar to the ES6 `import`/`export` syntax from earlier in this course. Node has long supported its own module system, using `require` and `module.exports`:

```js
// math.js
function add(a, b) {
  return a + b;
}

module.exports = { add };
```

```js
// app.js
const { add } = require("./math.js");
console.log(add(2, 3)); // 5
```

Modern Node also supports the `import`/`export` syntax you already know from ES6, once a project is configured for it — meaning much of what you learned about modules earlier in this course carries over directly.

## What Node Is Used For

Node.js is commonly used to build web servers (which you'll do in the next lesson using Express), command-line tools, and build scripts that process files or automate repetitive tasks. It's also the engine behind `npm`, the package manager you'll explore next, which powers nearly every modern JavaScript project.

## What's Next

You now understand what Node.js is and how to run JavaScript outside a browser. Before building anything substantial, you'll need to know how to install and manage external code written by others — the next lesson covers npm and package management, the backbone of the Node.js ecosystem.
