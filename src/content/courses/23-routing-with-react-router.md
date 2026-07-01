---
title: Routing with React Router
description: Build multi-page navigation in React using React Router's core components.
track: React Basics
order: 4
minutes: 7
---

## The Single-Page App Problem

A React application is typically a **single-page application** (SPA) — technically, it's all one HTML page, with JavaScript swapping content in and out as the user navigates. But users still expect to see different URLs for different pages, be able to bookmark them, and use the browser's back button. **React Router** is a library that provides exactly this, without triggering full page reloads.

## Setting Up the Router

Everything React Router does happens inside a `<BrowserRouter>` component, which should wrap your entire application:

```jsx
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {/* the rest of your app goes here */}
    </BrowserRouter>
  );
}
```

`BrowserRouter` connects your app to the browser's URL, letting React Router read and update it as the user navigates.

## Defining Routes

A **route** maps a URL path to a specific component to display. Routes are defined using `<Routes>` and `<Route>`:

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
```

`<Routes>` acts as a container that looks at the current URL and renders whichever single `<Route>` matches. The `path` attribute is the URL pattern, and `element` is the component to show when that path matches.

## Navigating Between Pages

To let users move between routes, use `<Link>` instead of a regular HTML `<a>` tag:

```jsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
```

`Link` looks like a normal link to the user, but behind the scenes it intercepts the click and updates the URL *without* triggering a full page reload — preserving your app's React state and keeping navigation instant.

## Dynamic Routes and useParams

Many applications need routes with a variable piece — like `/users/42` for user number 42's profile. This is done using a colon in the path:

```jsx
<Route path="/users/:userId" element={<UserProfile />} />
```

Inside the `UserProfile` component, the `useParams` hook reads that dynamic value out of the current URL:

```jsx
import { useParams } from "react-router-dom";

function UserProfile() {
  const { userId } = useParams();

  return <h2>Viewing profile for user {userId}</h2>;
}
```

If the URL is `/users/42`, then `useParams()` returns `{ userId: "42" }`, and destructuring (from an earlier lesson) pulls that value out directly. This pattern is extremely common — product pages, blog posts, and user profiles almost always use a dynamic route like this.

## What's Next

You can now build multi-page React applications with clean, bookmarkable URLs. The final React lesson combines everything so far — state, effects, and now routing — to fetch and display data from a server, including handling loading and error states gracefully.
