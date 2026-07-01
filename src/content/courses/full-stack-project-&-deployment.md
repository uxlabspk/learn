---
title: Full-Stack Project & Deployment
description: Build and deploy a complete web app with frontend, backend, and database.
track: Backend Development
order: 8
minutes: 12
---

## Full-Stack Architecture Overview

A **full-stack app** combines three layers:
- **Frontend**: The user interface (e.g., React, HTML/CSS).
- **Backend**: The server and logic (e.g., Express, Node.js).
- **Database**: Persistent data storage (e.g., MongoDB, PostgreSQL).

When a user interacts with the frontend, it sends a request to the backend. The backend processes the request, interacts with the database if needed, and sends a response back to the frontend. This is called the **request lifecycle**.

## Connecting React to Your API

To fetch data from your Express API in a React app, use the `fetch` function or a library like `axios`. For example:

```js
// React component fetching data from an Express API
useEffect(() => {
  fetch('http://localhost:3000/api/users')
    .then(response => response.json())
    .then(data => console.log(data));
}, []);
```

**CORS** (Cross-Origin Resource Sharing) is a security feature that restricts requests from different origins. To enable CORS in Express, use the `cors` middleware:

```js
const cors = require('cors');
app.use(cors());
```

## Environment Variables & Config

**Environment variables** store sensitive or environment-specific configuration (e.g., API keys, database URIs). Use a `.env` file to manage them:

```env
MONGODB_URI=mongodb://localhost:27017/mydb
API_KEY=your_key_here
```

Load environment variables in Node.js using the `dotenv` package:

```js
require('dotenv').config();
const dbUri = process.env.MONGODB_URI;
```

**Never commit `.env` files to version control** (e.g., Git). Add `.env` to your `.gitignore` file. Use separate configurations for **development** (local testing) and **production** (live app).

## Deploying a Full-Stack App

Deploying a full-stack app involves hosting both the frontend and backend:
- **Frontend**: Static files (HTML, CSS, JS) can be hosted on services like Vercel, Netlify, or GitHub Pages.
- **Backend**: Requires a running Node.js process. Use platforms like Render, Heroku, or AWS.

In production:
- Set `NODE_ENV=production` in your environment variables.
- Ensure your backend listens on the port provided by the hosting service (e.g., `process.env.PORT`).
- Use absolute paths for API requests (e.g., `https://your-api-url.com/api/users`).

Example Express setup for production:
```js
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

Next, you'll apply these concepts by building and deploying your own full-stack project.