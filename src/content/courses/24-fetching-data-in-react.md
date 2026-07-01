---
title: Fetching Data in React
description: Combine useEffect and fetch to load data in React, with loading and error states.
track: React Basics
order: 5
minutes: 8
---

## Bringing It All Together

This lesson combines several tools from earlier: `useState` for remembering data, `useEffect` for triggering the fetch, and the `fetch` API itself for retrieving data from a server. The goal is a pattern you'll use constantly in real React applications.

## The Three States of a Fetch

Whenever you fetch data, there are really three distinct situations your component needs to handle:

1. **Loading** — the request is in progress, no data yet
2. **Success** — the data arrived and is ready to display
3. **Error** — something went wrong (a network issue, a bad response)

A well-built component accounts for all three, rather than just assuming the fetch will succeed.

## A Complete Example

```jsx
import { useState, useEffect } from "react";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.example.com/posts")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        return response.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

## Walking Through the Logic

Three pieces of state track the three situations described above: `posts` holds the actual data, `loading` starts `true` and flips to `false` once the fetch finishes (either way), and `error` stores a message if something fails.

The `useEffect` with an empty dependency array `[]` ensures this fetch runs exactly once, when the component first appears. Inside, `response.ok` checks whether the server responded successfully — if not, an error is deliberately thrown, which gets caught by `.catch()` further down.

Before any data exists, the component returns early with a loading message. If an error occurred, it returns early with an error message instead. Only once both of those checks pass does the component render the actual list of posts.

## The key Prop

Notice each `<li>` includes a `key` attribute set to `post.id`. When React renders a list of items, it needs a stable, unique **key** for each one, so it can efficiently track which items changed, were added, or were removed between renders. Always use a unique, stable value for `key` — a database id is ideal. Using the array index as a key works in a pinch, but can cause subtle bugs if the list ever reorders.

## Why This Pattern Matters

This loading/error/success pattern appears constantly — profile pages, product listings, search results, dashboards. Getting comfortable with it is one of the most practically useful things you can learn in React, since almost every real application fetches data from somewhere.

## What's Next

You've now completed React Basics — state, effects, forms, routing, and data fetching. So far, all of this data has come from external APIs you don't control. Next, the course moves to the backend, starting with Node.js — how JavaScript runs outside the browser, powering the servers that supply the data your React apps fetch.
