---
title: Connecting React to Your API
description: Fetch data from an Express API in React and resolve common CORS errors.
track: Full-Stack Project & Deployment
order: 2
minutes: 7
---

## Two Separate Servers, During Development

While building a full-stack app, React and Express typically run as two completely separate servers on your computer during development — for example, React on `http://localhost:3000` and Express on `http://localhost:5000`. This separation is normal and expected, but it introduces a wrinkle you need to understand: browsers apply security restrictions when JavaScript running on one origin tries to talk to another.

## Fetching From React to Express

The actual `fetch()` call looks exactly like the ones from earlier lessons, just pointed at your own backend's URL instead of an external API:

```jsx
import { useState, useEffect } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/todos")
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

This combines everything from the React Basics track — `useState`, `useEffect`, `fetch` — pointed at a backend you built yourself, rather than a third-party API.

## The CORS Problem

The first time you try this, you'll likely hit an error in your browser console mentioning **CORS** (Cross-Origin Resource Sharing). This happens because browsers block JavaScript from making requests to a different **origin** (a different combination of domain and port) than the one the page was loaded from, unless that other server explicitly says it's allowed.

`localhost:3000` (React) and `localhost:5000` (Express) count as different origins, even though they're both on your own computer — the port number alone is enough to trigger this restriction.

## Fixing It on the Server

CORS is a restriction enforced by the browser, but the *fix* happens on the server: your Express backend needs to explicitly grant permission for requests coming from your frontend's origin. The `cors` package handles this:

```
npm install cors
```

```js
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
```

`app.use(cors())` with no arguments allows requests from any origin — convenient in early development, but too permissive for a real production application. A more precise, production-safe configuration limits it to your actual frontend's address:

```js
app.use(cors({
  origin: "http://localhost:3000"
}));
```

This tells the browser "requests from `localhost:3000` are explicitly allowed," resolving the CORS error while still blocking requests from unknown origins.

## Sending Data, Not Just Fetching It

`fetch()` defaults to a GET request. To send data — for example, adding a new to-do — you need to configure the request further:

```js
fetch("http://localhost:5000/api/todos", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: "Learn CORS" })
})
  .then(response => response.json())
  .then(data => console.log(data));
```

The `method` specifies POST, the `headers` tell the server the body is JSON (which pairs with the `express.json()` middleware from an earlier lesson), and `body` contains the actual data, converted from a JavaScript object into a JSON string with `JSON.stringify()`.

## What's Next

Your React frontend and Express backend can now talk to each other safely and reliably. The next lesson looks more closely at environment variables and configuration — managing settings and secrets differently across development and production, a topic that becomes essential as you prepare an app for deployment.
