---
title: Variables and Data Types
description: How JavaScript stores and labels information, and the types you'll use constantly.
track: JavaScript Fundamentals
order: 1
minutes: 8
pdf: /pdfs/js-variables-cheatsheet.pdf
---

Every program needs a way to remember things. In JavaScript, a **variable** is a named container that holds a value you can use later.

## Declaring a variable

```js
let score = 10;
const username = "hamza";
var legacy = "avoid this one";
```

Use `let` when a value will change, and `const` when it won't. Avoid `var` in new code — it behaves inconsistently in loops and functions.

## The core data types

- `string` — text, wrapped in quotes: `"hello"`
- `number` — both whole numbers and decimals: `42`, `3.14`
- `boolean` — `true` or `false`
- `undefined` — a variable that has been declared but not given a value
- `null` — an intentional "nothing"
- `object` — a collection of related values

## Checking a type

```js
console.log(typeof score);    // "number"
console.log(typeof username); // "string"
```

> A common beginner trap: `typeof null` returns `"object"`. This is a long-standing quirk of the language, not a mistake in your code.

Grab the printable cheatsheet below if you want a quick reference while you practice.
