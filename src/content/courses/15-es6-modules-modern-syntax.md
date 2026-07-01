---
title: ES6 Modules & Modern Syntax
description: Organize code across files with import/export and write cleaner JS syntax.
track: JavaScript Fundamentals
order: 4
minutes: 7
---

## What Is ES6?

ES6 (short for ECMAScript 2015) was a major update to JavaScript that introduced many features developers now consider standard. This lesson covers three of the most useful: modules, template literals, and destructuring.

## Modules: Splitting Code Across Files

As a project grows, keeping all your code in one giant file becomes unmanageable. **Modules** let you split code into separate files, then share pieces between them using `export` and `import`.

In one file, you **export** something you want to make available elsewhere:

```js
// math.js
export function add(a, b) {
  return a + b;
}

export const PI = 3.14159;
```

In another file, you **import** it to use it:

```js
// main.js
import { add, PI } from "./math.js";

console.log(add(2, 3)); // 5
console.log(PI); // 3.14159
```

This is called a **named export** — you can export multiple named things from one file, and import only the ones you need, by name, using curly braces.

There's also a **default export**, used when a file's main purpose is exporting one primary thing:

```js
// greet.js
export default function greet(name) {
  return `Hello, ${name}!`;
}
```

```js
// main.js
import greet from "./greet.js";
console.log(greet("Amara"));
```

Notice default imports don't use curly braces, and you can name them whatever you like on import.

## Template Literals

Before ES6, joining strings and variables together meant messy concatenation with `+`. **Template literals** use backticks (`` ` ``) instead of quotes, and let you embed variables directly using `${}`:

```js
const name = "Amara";
const age = 29;

// Old way:
const oldMessage = "Hello, " + name + ". You are " + age + " years old.";

// Template literal:
const message = `Hello, ${name}. You are ${age} years old.`;
```

Template literals also support multi-line strings without any special characters:

```js
const html = `
  <div>
    <p>${name}</p>
  </div>
`;
```

## Destructuring

**Destructuring** lets you pull values out of arrays or objects into individual variables in one concise step, instead of accessing them one at a time.

Object destructuring:

```js
const person = { name: "Amara", age: 29 };

// Old way:
const name = person.name;
const age = person.age;

// Destructuring:
const { name, age } = person;
```

Array destructuring works similarly, but uses square brackets and position instead of key names:

```js
const colors = ["red", "green", "blue"];
const [first, second] = colors;

console.log(first);  // "red"
console.log(second); // "green"
```

Destructuring is especially common when working with function parameters, letting you pull exactly the properties you need directly out of an object argument:

```js
function greet({ name, age }) {
  return `${name} is ${age} years old.`;
}
```

## What's Next

You've now completed the JavaScript Fundamentals track — data structures, DOM manipulation, async code, and modern syntax. Next, the course shifts to a different but essential skill: Git & Version Control, starting with the basics of tracking changes to your code over time.
