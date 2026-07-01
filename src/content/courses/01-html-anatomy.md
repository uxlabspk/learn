---
title: The Anatomy of an HTML Page
description: Learn how a web browser reads an HTML document from top to bottom.
track: HTML Basics
order: 1
minutes: 6
---

## What Is HTML?

HTML stands for HyperText Markup Language. It is not a programming language. Instead, it is a **markup language**, which means it uses tags to describe the structure of a page. Every website you have ever visited is built on HTML at its core.

Think of HTML as the skeleton of a webpage. It tells the browser: "this is a heading," "this is a paragraph," "this is a button." Later, CSS adds style, and JavaScript adds behavior. But HTML comes first.

## The Basic Structure

Every HTML page follows the same basic pattern. Here is the smallest complete HTML document:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
```

Let's break this down piece by piece.

### The Doctype

`<!DOCTYPE html>` must be the very first line. It tells the browser "this is a modern HTML document." Without it, some browsers switch into an old compatibility mode that can make your page behave strangely. You only need to write this once, at the top of every page.

### The html Element

Everything else lives inside `<html>...</html>`. This is called the **root element**, because it is the container for the whole document. Think of it as the outer box that holds everything else.

### The head Element

The `<head>` section holds information *about* the page, rather than content the visitor sees directly. This includes the page title (shown in the browser tab), links to CSS files, and metadata for search engines. Nothing inside `<head>` appears in the main page content.

### The body Element

The `<body>` is where the visible content lives: text, images, buttons, forms — everything a visitor actually sees and interacts with. If you only remember one rule, remember this: **content goes in the body**.

## How the Browser Reads It

When a browser loads a page, it reads the HTML from top to bottom, building something called the **DOM** (Document Object Model) as it goes. The DOM is the browser's internal map of your page's structure. Each tag becomes a piece of that map.

This matters because order affects behavior. For example, if a script tries to change a button before that button has been read into the DOM, the script will fail. That's why scripts are often placed near the bottom of the body.

## Tags Have a Pattern

Most HTML elements come in a pair: an opening tag and a closing tag, like `<h1>` and `</h1>`, wrapping around content. Some elements, like `<img>`, don't wrap content and don't need a closing tag — these are called **self-closing** or **void** elements.

```html
<p>This is a paragraph with an opening and closing tag.</p>
<img src="photo.jpg" alt="A mountain view">
```

## What's Next

Now that you understand the skeleton every HTML page shares, the next lesson looks at what actually goes inside the body: headings, paragraphs, and lists — the building blocks of readable text on the web.
