---
title: Databases
description: Build and deploy a complete web app with frontend, backend, and database.
track: Backend Development
order: 8
minutes: 12
---

## title: Databases

description: Learn to store and manage data for your web apps.  
track: Backend Development  
order: 7  
minutes: 11

## SQL Basics: Tables & Queries

Databases store data in **tables**, which are organized into **rows** (individual records) and **columns** (fields). For example, a `users` table might have columns like `id`, `name`, and `email`.

To retrieve data, use the `SELECT` statement:

```sql
SELECT * FROM users;
```

This fetches all rows from the `users` table. To filter results, use `WHERE`:

```sql
SELECT * FROM users WHERE age > 25;
```

**CRUD** (Create, Read, Update, Delete) operations are the foundation of database interactions:

- **Create**: `INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');`
- **Read**: `SELECT * FROM users;`
- **Update**: `UPDATE users SET email = 'new@example.com' WHERE id = 1;`
- **Delete**: `DELETE FROM users WHERE id = 1;`

## Relationships & Joins

Databases use **keys** to link tables. A **primary key** (e.g., `id`) uniquely identifies a row, while a **foreign key** links to a primary key in another table. For example, a `posts` table might have a `user_id` foreign key to link to the `users` table.

A **one-to-many** relationship means one row in a table (e.g., a user) can have many rows in another table (e.g., posts). To fetch data from multiple tables, use a `JOIN`:

```sql
SELECT users.name, posts.title
FROM users
JOIN posts ON users.id = posts.user_id;
```

## Introduction to MongoDB

**MongoDB** is a **NoSQL** database that stores data in **documents** (JSON-like objects) inside **collections** (similar to tables in SQL). Unlike SQL, MongoDB is **schema-less**, meaning documents in a collection can have different fields.

Use MongoDB when:

- Your data is **unstructured** or changes frequently.
- You need to **scale horizontally** (add more servers easily).
- You prefer working with **JSON-like data**.

For structured data with complex relationships, SQL databases are often a better choice.

## Connecting a Database to Express

To connect a database to your Express app, use environment variables to store credentials securely. For example, with MongoDB and the `mongodb` package:

```js
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI; // Store this in a .env file
const client = new MongoClient(uri);

app.get('/users', async (req, res) => {
  await client.connect();
  const users = await client.db('mydb').collection('users').find().toArray();
  res.send(users);
});
```

## Working with an ORM

An **ORM** (Object-Relational Mapping) tool like **Prisma** (for SQL) or **Mongoose** (for MongoDB) simplifies database interactions by letting you work with data as JavaScript objects.

With Mongoose, define a **schema** (blueprint for your data) and create a **model**:

```js
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({ name: String, email: String });
const User = mongoose.model('User', userSchema);

// Create a new user
const newUser = new User({ name: 'Bob', email: 'bob@example.com' });
await newUser.save();
```

ORMs handle queries, relationships, and validation, making your code cleaner and more maintainable.

Next, you'll explore how to deploy your backend and database to a cloud provider.
