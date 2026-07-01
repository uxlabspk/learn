---
title: Working with an ORM (Prisma/Mongoose)
description: Understand what an ORM does and how to define models and run queries with one.
track: Databases
order: 5
minutes: 7
---

## What Is an ORM?

An **ORM** (Object-Relational Mapper) is a tool that lets you interact with a database using your programming language's normal objects and functions, instead of writing raw query strings by hand. Two of the most popular ORM-style tools in the Node.js world are **Prisma** (typically used with SQL databases) and **Mongoose** (built specifically for MongoDB).

## Why Use an ORM?

Writing raw SQL strings directly in your JavaScript code, as in the previous lesson, works — but it has downsides. Query strings are easy to get subtly wrong, don't get any help from your code editor, and can become a security risk if user input isn't handled carefully. An ORM addresses all of this: it validates your queries against a known structure, autocompletes fields in your editor, and generally makes database code read more like the rest of your application.

## Defining a Model with Prisma

In Prisma, you define your database structure in a separate schema file, using Prisma's own syntax:

```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

This defines a `User` model with three fields, mirroring the `users` table from earlier SQL lessons. `@id` marks the primary key, `@default(autoincrement())` tells Prisma to auto-generate increasing id numbers, and `@unique` ensures no two users can share an email.

Once defined, Prisma generates a matching JavaScript client you can query directly:

```js
const users = await prisma.user.findMany();

const newUser = await prisma.user.create({
  data: { name: "Priya", email: "priya@example.com" }
});
```

Compare this to writing `SELECT * FROM users` by hand — `prisma.user.findMany()` accomplishes the same thing, but as a normal JavaScript function call, with autocomplete and type-checking support built in.

## Defining a Model with Mongoose

Mongoose, built for MongoDB, uses a similar idea but calls its structure a **schema**:

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model("User", userSchema);
```

Even though MongoDB itself doesn't require a fixed structure (as covered in the previous lesson), Mongoose lets you *optionally* enforce one at the application level — giving you MongoDB's flexibility where you want it, with some of SQL's predictability where you need it.

Querying with Mongoose looks similar to Prisma:

```js
const users = await User.find();

const newUser = await User.create({ name: "Priya", email: "priya@example.com" });
```

## Using an ORM Inside Express

Combining this with what you learned in the previous lesson, a route handler using an ORM looks cleaner than one using raw queries:

```js
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});
```

The overall shape — `async`, `await`, `try/catch` — stays exactly the same as before; only the query itself has changed to use the ORM's own methods instead of a raw SQL string.

## Should You Always Use an ORM?

For most applications, yes — an ORM saves time and reduces mistakes. Very simple scripts, or situations requiring highly specific, performance-tuned queries, sometimes still reach for raw SQL. But as a beginner, learning an ORM early will serve you well, since it's how the vast majority of professional Node.js backends are built today.

## What's Next

You've completed the Databases track — SQL, relationships, MongoDB, connections, and ORMs. With frontend, backend, and database knowledge in hand, the final track brings everything together: Full-Stack Project & Deployment, starting with how all these pieces fit into one working architecture.
