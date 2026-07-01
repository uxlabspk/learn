---
title: Arrays and Objects
description: Store and work with collections of data using JavaScript arrays and objects.
track: JavaScript Fundamentals
order: 1
minutes: 8
---

## Two Ways to Group Data

JavaScript gives us two essential structures for grouping related data: **arrays** for ordered lists, and **objects** for labeled collections of properties. Nearly every JavaScript program uses both.

## Arrays: Ordered Lists

An array is a list of values, written inside square brackets and separated by commas:

```js
const fruits = ["apple", "banana", "cherry"];
```

Each item has a numbered position called an **index**, starting at 0, not 1. This trips up many beginners at first.

```js
console.log(fruits[0]); // "apple"
console.log(fruits[2]); // "cherry"
```

## Common Array Methods

A **method** is a function attached to a value, called with a dot. Arrays come with several methods that make working with lists much easier.

`.map()` creates a *new* array by transforming every item:

```js
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6]
```

`.filter()` creates a new array containing only the items that pass a test:

```js
const ages = [12, 25, 8, 40];
const adults = ages.filter(age => age >= 18);
console.log(adults); // [25, 40]
```

Both methods take a small function as their argument, run it against every item, and build a new array from the results — the original array is never changed.

## Objects: Labeled Data

While an array uses numbered positions, an **object** uses named **keys** to label each piece of data. Objects are written with curly braces:

```js
const person = {
  name: "Amara",
  age: 29,
  isStudent: false
};
```

Each `key: value` pair is called a **property**. This is often called an **object literal** — a way of writing an object's structure directly in your code.

## Accessing Object Properties: Two Ways

You can read a property using **dot notation**:

```js
console.log(person.name); // "Amara"
```

Or using **bracket notation**, with the key as a string:

```js
console.log(person["name"]); // "Amara"
```

Dot notation is more common and easier to read, but bracket notation is necessary when the key is stored in a variable, or contains characters that dot notation can't handle (like a space):

```js
const key = "age";
console.log(person[key]); // 29
```

## Arrays of Objects

In real applications, you'll often see arrays and objects combined — an array holding multiple objects, each representing one "record":

```js
const users = [
  { name: "Amara", age: 29 },
  { name: "Deshi", age: 34 }
];

const names = users.map(user => user.name);
console.log(names); // ["Amara", "Deshi"]
```

This pattern — an array of objects, transformed with `.map()` or `.filter()` — is one of the most common things you'll write in JavaScript, especially when building anything that displays a list of data, like products, comments, or search results.

## What's Next

Arrays and objects are how JavaScript stores data. But storing data is only half the story — the next lesson covers DOM manipulation, where you'll learn how JavaScript actually changes what appears on a webpage in response to user actions.
