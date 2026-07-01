---
title: "Routes, Middleware & Request Handling"
description: Extract route parameters, read request data, and use middleware in Express.
track: Backend with Node.js & Express
order: 4
minutes: 8
---

## Route Parameters

Just like React Router's dynamic routes from an earlier lesson, Express routes can include variable segments, marked with a colon:

```js
app.get("/users/:userId", (req, res) => {
  res.send(`Looking up user ${req.params.userId}`);
});
```

If a request comes in for `/users/42`, Express matches it to this route and makes `42` available on `req.params.userId`. The `params` object holds every dynamic segment defined in the route's path, keyed by name.

## Reading Data Sent by the Client

When a client submits form data or JSON — typically with a POST request — that data arrives in the **request body**. By default, Express doesn't automatically parse this data; you need to explicitly tell it to, using a piece of built-in **middleware**.

```js
app.use(express.json());

app.post("/users", (req, res) => {
  console.log(req.body);
  res.send(`Created user: ${req.body.name}`);
});
```

`express.json()` reads incoming requests, checks if they contain JSON, and — if so — parses it and attaches the result to `req.body`, ready to use. Without this line, `req.body` would be `undefined`, a very common early bug for beginners.

## What Is Middleware?

**Middleware** is a function that runs *between* an incoming request and your final route handler, with the ability to inspect, modify, or reject the request before it continues. `express.json()`, used above, is itself a piece of middleware.

Middleware functions receive three arguments: `req`, `res`, and a third one, conventionally called `next`.

```js
function logRequest(req, res, next) {
  console.log(`${req.method} request to ${req.url}`);
  next();
}

app.use(logRequest);
```

Calling `next()` is essential — it tells Express "this middleware is done, move on to whatever comes next" (either another middleware, or the final route handler). If you forget to call `next()`, the request simply hangs, waiting forever, because Express doesn't know to proceed.

`app.use()` applies middleware to every incoming request, regardless of path. Middleware can also be scoped to a single route by inserting it as an extra argument:

```js
app.get("/admin", checkIsLoggedIn, (req, res) => {
  res.send("Welcome, admin");
});
```

Here, `checkIsLoggedIn` would run first, and only call `next()` (allowing the actual route handler to run) if the user is authorized.

## Query Parameters

Beyond route parameters, URLs can also carry **query parameters** — the part after a `?`, like `/search?term=shoes`. Express parses these automatically into `req.query`:

```js
app.get("/search", (req, res) => {
  res.send(`Searching for: ${req.query.term}`);
});
```

Visiting `/search?term=shoes` makes `req.query.term` equal to `"shoes"`.

## Putting It Together

```js
const express = require("express");
const app = express();

app.use(express.json());

app.get("/products/:id", (req, res) => {
  res.json({ id: req.params.id, name: "Sample Product" });
});

app.post("/products", (req, res) => {
  res.json({ message: `Created product: ${req.body.name}` });
});

app.listen(3000);
```

## What's Next

You now understand how Express routes, parses data, and processes requests through middleware. With these building blocks in place, the next lesson steps back to look at REST APIs as a whole — the conventions that make backend APIs predictable and consistent across the entire web.
