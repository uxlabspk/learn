---
title: Environment Variables & Config
description: Manage secrets and settings safely across development and production using .env files.
track: Full-Stack Project & Deployment
order: 3
minutes: 6
---

## Revisiting Environment Variables

Earlier, in the Databases track, you used a `.env` file to store a database connection string safely, outside your actual code. This lesson expands on that idea, covering configuration more broadly, across both your backend and frontend, as you prepare an application for real-world use.

## What Belongs in .env

A `.env` file typically holds anything that is either secret (should never be public) or that changes between environments (development vs. production). Common examples include database connection strings, API keys for third-party services, and port numbers.

```
# .env
PORT=5000
DATABASE_URL=postgres://localhost:5432/myapp
STRIPE_SECRET_KEY=sk_test_abc123
```

## Never Commit Secrets

This point is worth repeating, because it's one of the most common and damaging mistakes beginners make: `.env` files must always be listed in `.gitignore`. If a secret key is accidentally committed and pushed to a public GitHub repository, it should be considered compromised immediately — bots actively scan public repositories for exposed credentials, often within minutes of a push.

```
# .gitignore
.env
node_modules/
```

If you do accidentally commit a secret, the correct fix isn't just deleting it in a new commit — the old commit still contains it in your Git history. The safest response is to immediately regenerate (invalidate and replace) that credential at its source.

## A Template for Collaborators

Since `.env` is never committed, anyone else working on your project won't automatically know which variables are needed. A common convention is committing a template file instead, showing the required variable names without real values:

```
# .env.example
PORT=
DATABASE_URL=
STRIPE_SECRET_KEY=
```

`.env.example` *is* safe to commit, since it contains no actual secrets — just a list of what each developer needs to fill in on their own machine.

## Development vs Production Config

Applications typically behave slightly differently depending on where they're running. A special variable, `NODE_ENV`, is a widely used convention for signaling this:

```js
if (process.env.NODE_ENV === "production") {
  console.log("Running in production mode");
} else {
  console.log("Running in development mode");
}
```

This lets your code make small adjustments based on context — for example, showing detailed error messages during development (helpful for debugging) but hiding those same details in production (where exposing internal error details to real users could be a security risk).

## Environment Variables in the Frontend

React applications also use environment variables, though with an important caveat: because frontend code runs in the user's browser, anything included in it — including environment variables — is visible to anyone who inspects the page. **Never put secret keys in frontend environment variables.** They're appropriate there only for non-sensitive configuration, like a public API URL:

```
# .env (in a React project)
REACT_APP_API_URL=http://localhost:5000
```

```jsx
fetch(`${process.env.REACT_APP_API_URL}/api/todos`)
```

This makes it easy to point your frontend at a different backend URL between development and production, without changing any actual code — just the environment variable's value.

## What's Next

You now know how to manage configuration safely across environments. The final lesson of this course brings everything together: actually deploying a full-stack application, so it's reachable by real users on the internet rather than just `localhost`.
