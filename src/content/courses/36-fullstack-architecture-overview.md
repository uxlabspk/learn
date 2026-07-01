---
title: Full-Stack Architecture Overview
description: See how frontend, backend, and database pieces connect through a full request lifecycle.
track: Full-Stack Project & Deployment
order: 1
minutes: 7
---

## Bringing Everything Together

Across this course, you've learned pieces in isolation: HTML and CSS for structure and style, JavaScript and React for interactivity, Node.js and Express for servers, and SQL or MongoDB for data storage. This lesson connects all of them into one mental model of how a **full-stack application** — one with a frontend, a backend, and a database — actually works together.

## The Three Layers

A typical full-stack web application has three main layers:

**Frontend** — the part running in the user's browser. This is your HTML, CSS, and JavaScript (often built with React), responsible for what the user sees and interacts with directly.

**Backend** — a server (built with Node.js and Express, in this course) that receives requests, runs business logic, and talks to the database. The backend doesn't care what the frontend looks like — it just receives requests and returns data.

**Database** — where data persists long-term (SQL or MongoDB, as covered earlier), outliving any single request or server restart.

## The Request Lifecycle

Understanding how a single user action flows through all three layers is one of the most valuable mental models in web development. Here's what happens, step by step, when a user clicks a button to load their profile:

1. The user clicks a button in the React frontend
2. React calls `fetch()`, sending an HTTP request to the backend's URL (e.g., `GET /api/users/42`)
3. The Express server receives the request and matches it to a route
4. Inside that route handler, the server queries the database (using an ORM or raw SQL) to retrieve the relevant data
5. The database returns the requested rows or documents back to the server
6. The server formats that data as JSON and sends it back as the HTTP response
7. React receives the response, updates its state (using `useState`), and re-renders to show the new data on screen

```
Browser (React) → HTTP Request → Express Server → Database Query → Database
                                                          ↓
Browser (React) ← HTTP Response ← Express Server ← Query Results
```

Every single piece of this course — `useState`, `fetch`, Express routes, `req.params`, ORM queries — exists to handle one leg of this journey.

## Why Separate These Layers?

You might wonder why not just put everything in one place. Separating frontend, backend, and database serves several purposes: each layer can be developed, tested, and scaled independently; the same backend can serve multiple frontends (a website, a mobile app); and sensitive logic (like database credentials and business rules) stays safely on the server, never exposed to the browser, where anyone could inspect it.

## A Concrete Example

Imagine a simple to-do list application. The React frontend displays a list and a form to add new items. When a user submits the form, React sends a `POST /api/todos` request with the new item's text. Express receives it, inserts a new row into a `todos` table (or MongoDB collection), and responds with the newly created item, including its database-assigned id. React then updates its local state to include this new item, and the list re-renders — all without a full page reload.

## What's Next

With this full picture in mind, the next lesson zooms into one specific, often-tricky part of this chain: actually connecting your React frontend to your Express backend during development, including a common early stumbling block called CORS.
