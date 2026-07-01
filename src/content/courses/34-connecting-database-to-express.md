---
title: Connecting a Database to Express
description: Safely connect Express to a database using environment variables and route queries.
track: Databases
order: 4
minutes: 7
---

## Why a Server Needs a Database Connection

So far, your Express routes have returned hardcoded, fake data. A real application needs to read and write actual, persistent data — which means your server needs to establish a connection to a database, and use that connection inside your route handlers.

## Never Hardcode Credentials

Connecting to a database requires credentials — typically a connection string containing a username, password, and server address. A critical rule: **never write these directly in your code**, especially if that code is committed to Git and potentially made public on GitHub. Anyone who sees your credentials could access (or destroy) your database.

## Environment Variables

The standard solution is **environment variables** — values stored outside your code, typically in a special file called `.env`, which (as covered in the Git lessons) is always added to `.gitignore` and never committed.

```
# .env
DATABASE_URL=postgres://user:password@localhost:5432/mydb
```

In Node.js, a package called `dotenv` loads these values from the `.env` file into `process.env`, a built-in object holding environment variables:

```
npm install dotenv
```

```js
require("dotenv").config();

console.log(process.env.DATABASE_URL);
```

Calling `require("dotenv").config()` at the very top of your entry file reads the `.env` file and makes every variable inside it available through `process.env`.

## A Basic Connection Example

Using PostgreSQL (a popular SQL database) as an example, with the `pg` package:

```js
require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
```

A `Pool` manages a set of reusable database connections, so your server doesn't need to open a brand-new connection for every single request — which would be slow and wasteful.

## Querying From a Route Handler

Once connected, you can run queries directly inside your Express route handlers:

```js
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});
```

Notice this route handler is marked `async`, and uses `await` — exactly the pattern from the earlier async JavaScript lesson, since database queries take an unpredictable amount of time and shouldn't block the rest of the server. The `try/catch` block ensures that if the query fails for any reason (a bad connection, an invalid query), the server responds gracefully with a `500` status instead of crashing.

## Different Configs for Development and Production

Most real applications run in more than one environment — a **development** environment on your own computer, and a **production** environment, the live version real users interact with. Environment variables make it easy to point each environment at a different database, just by using a different `.env` file (or configuration set on the hosting platform) without changing any code:

```
# .env.development
DATABASE_URL=postgres://localhost:5432/myapp_dev

# .env.production
DATABASE_URL=postgres://prod-server:5432/myapp_prod
```

This separation prevents a common, painful mistake: accidentally testing new, unstable code against your real, live production data.

## What's Next

You now know how to safely connect a database to your server. Writing raw SQL queries directly in your route handlers works, but can get repetitive and error-prone as an application grows. The final Databases lesson introduces ORMs — tools like Prisma and Mongoose that make working with databases more structured and convenient.
