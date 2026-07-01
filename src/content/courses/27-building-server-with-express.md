---
title: Building a Server with Express
description: Create your first web server using Express, handling requests and sending responses.
track: Backend with Node.js & Express
order: 3
minutes: 7
---

## What Is Express?

Express is the most widely used web framework for Node.js. A **framework** is a pre-built structure of tools and conventions that handles common, repetitive tasks, so you can focus on your application's actual logic. Without Express, handling web requests in raw Node.js requires a surprising amount of manual, low-level code; Express simplifies this dramatically.

## Installing Express

As covered in the previous lesson, you install Express with npm:

```
npm install express
```

## Your First Server

Here is a complete, working Express server:

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

Let's walk through each piece.

## Creating the App

`const app = express()` creates an Express application — this `app` object is how you'll define every route and behavior your server has.

## Defining a Route

`app.get("/", ...)` defines a **route**: a rule saying "when someone requests the path `/` using an HTTP GET request, run this function." The function receives two important objects, conventionally named `req` and `res`.

`req` (short for **request**) represents the incoming request — it holds information like the URL requested, any data submitted, and headers sent by the browser.

`res` (short for **response**) is how you send something back. `res.send("Hello, world!")` sends that text back to whoever made the request.

## Starting the Server

`app.listen(3000, ...)` starts the server, telling it to listen for incoming requests on **port 3000** — a numbered "channel" on your computer that the server watches for traffic. Once running, visiting `http://localhost:3000` in a browser sends a request to this exact server, triggering the `/` route defined above.

## Handling Multiple Routes

A real application defines many routes, one for each URL path it needs to respond to:

```js
app.get("/", (req, res) => {
  res.send("Welcome to the homepage");
});

app.get("/about", (req, res) => {
  res.send("This is the about page");
});
```

Visiting `/about` triggers the second route instead of the first — Express matches incoming requests to routes based on both the path and the HTTP method (GET, in both examples here).

## Sending JSON

Real-world APIs almost always send structured data instead of plain text, using `res.json()`:

```js
app.get("/api/user", (req, res) => {
  res.json({ name: "Amara", age: 29 });
});
```

This automatically converts a JavaScript object into JSON text, and sets the appropriate response headers so the receiving application knows to parse it as JSON — this is exactly the kind of response your earlier `fetch()` calls in React were designed to consume.

## Running the Server

Save your server code as `app.js`, then run it with:

```
node app.js
```

The terminal will print "Server running on port 3000," and the server will keep running, actively listening for requests, until you stop it (typically with Ctrl+C).

## What's Next

You've built a basic server that responds to requests. Real applications need more: reading data submitted in a request, extracting parameters from the URL, and running shared logic across multiple routes. The next lesson covers exactly that — request handling, route parameters, and middleware.
