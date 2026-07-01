---
title: JavaScript Fundamentals
description: Learn the programming language that makes your webpage interactive.
track: beginner
order: 3
minutes: 12
---

# JavaScript Fundamentals

If HTML is the structure of a house and CSS is the paint and furniture, then JavaScript (JS) is the electricity and plumbing—it makes things *happen*! JavaScript is the programming language that brings interactivity and dynamic behavior to your website.

## Arrays and Objects

JavaScript is excellent at handling collections of data.

### Objects

Objects are used to store data in key-value pairs. They are perfect for representing things, like a user profile or a product.

```javascript
const user = {
  name: "Alice",
  age: 30,
  city: "New York"
};

// Accessing data using dot notation (preferred)
console.log(user.name); // Output: Alice

// Accessing data using bracket notation (useful for dynamic keys)
console.log(user["age"]); // Output: 30
```

### Arrays and Array Methods

Arrays are ordered lists of data. They are used for collections of things. Modern JavaScript provides powerful methods to work with arrays:

*   **`.map()`:** Creates a *new* array by running a function on every item in the original array.
*   **`.filter()`:** Creates a *new* array containing only the elements that pass a certain test.

```javascript
const numbers = [1, 2, 3, 4, 5];

// Using map to double every number
const doubled = numbers.map(num => num * 2);
console.log(doubled); // Output: [2, 4, 6, 8, 10]

// Using filter to get only the even numbers
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // Output: [2, 4]
```

## DOM Manipulation & Events

The Document Object Model (DOM) is the programming interface that allows JavaScript to interact with your HTML and CSS. It represents the entire HTML document as a tree structure.

### Selecting Elements

You first need to find the HTML elements you want to change. The most common way to select a single element is using `document.querySelector()`.

```javascript
// Selects the first element with the ID "myButton"
const button = document.querySelector('#myButton');
```

### Adding Event Listeners

Events are actions that happen in the browser (like a click, a key press, or a page loading). You attach a function to run when a specific event occurs using `addEventListener()`.

```javascript
const button = document.querySelector('#myButton');

button.addEventListener('click', function() {
  // This function runs every time the button is clicked
  alert('Button was clicked!');
  document.body.style.backgroundColor = 'lightgreen';
});
```

## Async JavaScript & Fetch API

Real-world web applications often need to talk to servers to get data. This is called asynchronous programming.

The `fetch()` API allows you to make network requests (like getting data from an API). It returns a **Promise**, which is an object representing the eventual completion (or failure) of an asynchronous operation. We use `async/await` to make asynchronous code look synchronous and much easier to read.

```javascript
async function fetchData() {
  try {
    // 'await' pauses execution until the network request is complete
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    
    // Convert the response to JSON data
    const data = await response.json();
    console.log('Data received:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();
```

## ES6 Modules & Modern Syntax

Modern JavaScript uses features from ES6 (ECMAScript 2015) that make code cleaner and more organized.

*   **Template Literals:** Use backticks (`` ` ``) instead of quotes to easily embed variables directly into strings.
*   **Destructuring:** A clean way to unpack values from arrays or properties from objects into distinct variables.

```javascript
// Template Literal Example
const userName = "Bob";
const greeting = `Hello, ${userName}! Welcome back.`;
console.log(greeting);

// Destructuring Example
const user = { name: "Bob", age: 25 };
const { name, age } = user;

console.log(`User ${name} is ${age} years old.`);
```

---

You've completed the introduction to JavaScript! You now understand how to manage data with Arrays and Objects, interact with the webpage using the DOM, and handle data fetching with asynchronous methods. In the next lesson, we will look at how to use these skills to build a simple, interactive calculator!