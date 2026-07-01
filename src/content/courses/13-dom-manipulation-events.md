---
title: DOM Manipulation & Events
description: Select HTML elements and respond to user actions using JavaScript and the DOM.
track: JavaScript Fundamentals
order: 2
minutes: 8
---

## What Is the DOM?

The DOM (Document Object Model) is the browser's live representation of your HTML page, as a structure JavaScript can read and change. When JavaScript modifies the DOM, the visible page updates instantly — this is how buttons, dropdowns, and interactive forms actually work.

## Selecting Elements

Before you can change anything, you need to select it. The most flexible tool for this is `querySelector`, which accepts a CSS selector — the same kind you learned in the CSS lessons:

```js
const heading = document.querySelector("h1");
const button = document.querySelector(".submit-button");
const banner = document.querySelector("#main-banner");
```

`querySelector` returns the **first** matching element. If you need every matching element, use `querySelectorAll`, which returns a list of all of them:

```js
const allParagraphs = document.querySelectorAll("p");
```

## Changing Content

Once you've selected an element, you can change what it displays using `textContent`:

```js
const heading = document.querySelector("h1");
heading.textContent = "Welcome Back!";
```

This replaces whatever text was inside the `<h1>` tag with new text, immediately, without reloading the page.

## Changing Classes

You can also add or remove CSS classes with JavaScript, which is a common way to trigger style changes — like showing a message or highlighting an error:

```js
const box = document.querySelector(".box");
box.classList.add("highlighted");
box.classList.remove("hidden");
box.classList.toggle("active");
```

`classList.toggle()` is especially useful — it adds the class if it's missing, or removes it if it's already there, which is perfect for things like show/hide menus.

## Events: Responding to Actions

An **event** is something that happens on the page — a click, a key press, a form submission. JavaScript listens for events using `addEventListener`:

```js
const button = document.querySelector("button");

button.addEventListener("click", function () {
  console.log("Button was clicked!");
});
```

`addEventListener` takes two arguments: the type of event to listen for (as a string, like `"click"`), and a function to run when that event happens. This function is often called a **callback**, because the browser "calls it back" once the event occurs.

## A Practical Example

Here's a small, complete example that toggles a message when a button is clicked:

```html
<button id="toggle-btn">Show Message</button>
<p id="message" class="hidden">Hello there!</p>
```

```css
.hidden {
  display: none;
}
```

```js
const button = document.querySelector("#toggle-btn");
const message = document.querySelector("#message");

button.addEventListener("click", function () {
  message.classList.toggle("hidden");
});
```

Each time the button is clicked, the `hidden` class is toggled on the paragraph — hiding it if visible, showing it if hidden. This tiny pattern — select, listen, respond — is the foundation of almost all interactive behavior on the web.

## What's Next

You now know how to select elements and respond to user actions. But real applications often need to fetch data from somewhere else, like a server, which takes time. The next lesson covers async JavaScript and the Fetch API — how JavaScript handles operations that don't finish instantly.
