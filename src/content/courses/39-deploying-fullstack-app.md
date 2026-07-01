---
title: Deploying a Full-Stack App
description: Understand what changes when moving a full-stack app from localhost to production.
track: Full-Stack Project & Deployment
order: 4
minutes: 8
---

## From localhost to the Real World

Throughout this course, every project has run on `localhost` — your own computer, visible only to you. **Deployment** is the process of making an application available to real users on the internet, on servers that stay running even when your own laptop is closed. This final lesson covers what actually changes when you deploy a full-stack application.

## Two Different Kinds of Hosting

Your frontend and backend generally need different types of hosting, because they behave differently.

### Static Frontend Hosting

A built React application compiles down to a fixed set of HTML, CSS, and JavaScript files — it doesn't need to *run* continuously; it just needs to be *served* to visitors. This is called **static hosting**, and it's relatively simple and often free for smaller projects. Popular options include Vercel, Netlify, and GitHub Pages.

Before deploying, a React project is **built** — converted from development-friendly source code into optimized, production-ready files:

```
npm run build
```

This typically produces a `build` (or `dist`) folder containing the final static files, ready to be uploaded to a hosting provider.

### Running Backend Processes

Unlike a static frontend, your Express server needs to be **running continuously** — actively listening for requests at any moment, handling database connections, and executing logic on demand. This requires a different kind of hosting: a **running process**, not just static files. Popular options for this include Render, Railway, and Fly.io.

## What Changes in Production

Several things need adjustment when moving from development to a live, production environment.

**URLs change.** Your frontend's `fetch()` calls, which pointed at `http://localhost:5000` during development, now need to point at your backend's real, deployed URL (something like `https://myapi.onrender.com`). This is exactly why the previous lesson's environment variable approach matters — you can simply update `REACT_APP_API_URL` for production, without touching any code.

**CORS configuration tightens.** Recall from an earlier lesson that `cors()` with no arguments allows any origin — appropriate for quick local testing, but too loose for production. In production, you restrict it to your actual deployed frontend's URL:

```js
app.use(cors({
  origin: "https://myapp.com"
}));
```

**Environment variables move to the hosting platform.** Since `.env` files are never committed to Git, your actual secret values (database URLs, API keys) need to be entered directly into your hosting provider's dashboard, where they're securely stored and injected into the running application — the `.env` file itself never leaves your own computer.

**The database moves too.** A database running on your own machine isn't reachable from a server elsewhere on the internet. Production applications typically use a managed database service (many hosting providers offer these directly), with its own connection string, set as an environment variable exactly like before.

## A Simplified Deployment Checklist

1. Push your finished code to GitHub
2. Deploy the backend (Express) to a service that supports running processes, setting environment variables in that platform's dashboard
3. Set up a production database, and update `DATABASE_URL` to point at it
4. Build the frontend (`npm run build`) and deploy it to a static hosting provider
5. Update the frontend's API URL environment variable to point at your live backend
6. Update the backend's CORS configuration to allow requests from your live frontend's URL

## Course Complete

This lesson closes the loop on everything covered across this course — from a single `<h1>` tag in your very first lesson, to a fully deployed, full-stack application running live on the internet. From here, the best next step is building something of your own: pick a small idea, and work through this same pipeline — HTML and CSS, React, Express, a database, and finally, deployment — end to end.
