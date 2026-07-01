---
title: Backend with Node.js & Express
description: Learn to build server-side apps with Node.js and Express.
track: Backend Development
order: 6
minutes: 10
---

## What is Node.js?

Node.js is a **runtime environment** that lets you run JavaScript outside the browser. Unlike browser-based JavaScript, Node.js executes code on your computer or a server, making it ideal for building backend applications. It uses an **event-driven, non-blocking** model, which means it can handle many tasks at once without waiting for one to finish before starting another.

To run a JavaScript file with Node.js, save it (e.g., `app.js`) and use the command:
```bash
node app.js
```

Node.js also introduces **modules**, which are reusable pieces of code. You can import modules using `require`:
```js
const fs = require('fs'); // Import the 'fs' module for file operations
```

## Managing Dependencies with npm

**npm** (Node Package Manager) is a tool for installing and managing libraries (called **packages**) in your project. Every Node.js project has a `package.json` file, which lists its dependencies and metadata.

To start a new project, run:
```bash
npm init -y
```
This creates a `package.json` file. To install a package (e.g., Express), use:
```bash
npm install express
```

Dependencies in `package.json` are split into:
- **dependencies**: Packages required for your app to run in production.
- **devDependencies**: Packages only needed during development (e.g., testing tools).

## Building a Server with Express

**Express** is a popular framework for building web servers in Node.js. A basic server looks like this:

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

Here, `app.get` defines a **route** for the homepage (`/`). When a user visits this route, the server sends the response `'Hello, World!'`. The `app.listen` method starts the server on **port 3000**.

## Routes, Middleware, and Request Handling

**Routes** define how your app responds to client requests. For example, to handle a route with a parameter:
```js
app.get('/users/:id', (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});
```

**Middleware** are functions that process requests before they reach your routes. For example, `express.json()` parses JSON data from incoming requests:
```js
app.use(express.json());
```

The `req` (request) and `res` (response) objects contain data about the request and methods to send a response, respectively.

## Designing a REST API

A **REST API** (Representational State Transfer) is a way for clients to interact with server resources using **HTTP verbs**:
- `GET`: Retrieve data (e.g., fetch a list of users).
- `POST`: Create data (e.g., add a new user).
- `PUT`: Update data (e.g., edit a user).
- `DELETE`: Remove data (e.g., delete a user).

Each response includes a **status code** (e.g., `200` for success, `404` for not found).

## Authentication Basics

**Authentication** verifies a user's identity. Two common methods are:
- **Sessions**: Store user data on the server (e.g., using cookies).
- **JWT (JSON Web Tokens)**: Store user data in a signed token sent to the client.

JWTs are compact, self-contained, and widely used for stateless authentication.

Next, you'll dive deeper into building RESTful APIs and explore how to connect your backend to a database.