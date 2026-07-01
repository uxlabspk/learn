---
title: Designing a REST API
description: Learn REST conventions including resources, HTTP verbs, and status codes.
track: Backend with Node.js & Express
order: 5
minutes: 7
---

## What Is REST?

REST (short for Representational State Transfer) is a set of conventions for designing web APIs in a predictable, consistent way. It's not a strict technology or library — it's a style that most modern APIs, including the ones you've been calling with `fetch()` throughout this course, tend to follow.

## Resources

At the heart of REST is the idea of a **resource** — a "thing" your API manages, like a user, a product, or a blog post. Each resource type gets its own URL pattern, usually a plural noun:

```
/users
/products
/posts
```

A single resource within that collection is addressed by adding an identifier:

```
/users/42
/products/17
```

## HTTP Verbs

REST APIs use **HTTP methods** (also called verbs) to indicate what action to perform on a resource, rather than encoding the action into the URL itself. The four core verbs map directly onto CRUD operations — **C**reate, **R**ead, **U**pdate, **D**elete:

| Verb | Action | Example |
|------|--------|---------|
| GET | Read data | `GET /users/42` — fetch user 42 |
| POST | Create data | `POST /users` — create a new user |
| PUT | Update data | `PUT /users/42` — replace user 42 |
| DELETE | Delete data | `DELETE /users/42` — remove user 42 |

Notice the URL stays the same (`/users/42`) across GET, PUT, and DELETE — the HTTP verb, not the URL, communicates the intended action. This consistency is exactly what makes REST predictable: once you know a resource's URL pattern, you can guess how to perform any operation on it.

## Implementing This in Express

```js
const express = require("express");
const app = express();
app.use(express.json());

app.get("/users/:id", (req, res) => {
  res.json({ id: req.params.id, name: "Amara" });
});

app.post("/users", (req, res) => {
  res.status(201).json({ message: "User created", name: req.body.name });
});

app.put("/users/:id", (req, res) => {
  res.json({ message: `User ${req.params.id} updated` });
});

app.delete("/users/:id", (req, res) => {
  res.json({ message: `User ${req.params.id} deleted` });
});
```

Each route corresponds to exactly one verb-and-path combination, matching the REST conventions above.

## HTTP Status Codes

Every HTTP response includes a **status code** — a three-digit number summarizing what happened. Using the right one is a core part of good API design, since it tells the client (without needing to parse a message) whether a request succeeded, failed, or something else happened.

The broad categories are:

- **2xx** — success (`200 OK`, `201 Created`)
- **4xx** — the client made a mistake (`400 Bad Request`, `404 Not Found`)
- **5xx** — the server made a mistake (`500 Internal Server Error`)

In Express, you set a status code with `res.status()` before sending the response:

```js
app.post("/users", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "Name is required" });
  }
  res.status(201).json({ message: "User created" });
});
```

`201 Created` is the conventional success code specifically for POST requests that create something new, distinct from the more general `200 OK`. `400 Bad Request` tells the client their request was malformed — here, missing a required field — well before anything goes wrong on the server's side.

## What's Next

You now understand the conventions behind well-designed APIs. The final lesson in this track addresses a critical concern for any real application: authentication — how a server knows who's making a request, using sessions and JSON Web Tokens (JWT).
