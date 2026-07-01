---
title: Introduction to MongoDB
description: Learn document-based storage in MongoDB and when to choose NoSQL over SQL.
track: Databases
order: 3
minutes: 7
---

## A Different Way to Store Data

Everything covered so far — tables, rows, columns, foreign keys — belongs to the world of **relational** (SQL) databases. **MongoDB** takes a fundamentally different approach, belonging to a broader category called **NoSQL** databases. Instead of rigid tables, MongoDB stores data as flexible, self-contained documents.

## Documents and Collections

In MongoDB, a **document** is a single record, stored in a format very similar to a JavaScript object — in fact, it's stored as a variation of JSON. A **collection** is a group of documents, roughly equivalent to a table in SQL, though far less rigid about structure.

```json
{
  "_id": "1",
  "name": "Amara",
  "email": "amara@example.com",
  "interests": ["hiking", "reading"]
}
```

Notice this single document contains an array (`interests`) directly nested inside it — something that would require a separate related table in a SQL database. MongoDB embraces this kind of nesting, letting related data live together in one document rather than spread across multiple linked tables.

## No Fixed Schema

In SQL, every row in a table must follow the same structure, defined in advance — every `users` row has the exact same columns. MongoDB has no such requirement by default. Two documents in the same collection can have entirely different fields:

```json
{ "_id": "1", "name": "Amara", "email": "amara@example.com" }
{ "_id": "2", "name": "Deshi", "email": "deshi@example.com", "phone": "555-1234" }
```

The second document has an extra `phone` field that the first one lacks, and MongoDB has no problem with this. This flexibility is sometimes called being **schemaless**, though in practice, most real applications still enforce a consistent structure through their application code, even if the database itself doesn't require it.

## Basic MongoDB Operations

MongoDB's query language differs from SQL syntax, but performs the same fundamental CRUD operations. Finding documents:

```js
db.users.find({ name: "Amara" });
```

Inserting a document:

```js
db.users.insertOne({ name: "Priya", email: "priya@example.com" });
```

Updating a document:

```js
db.users.updateOne({ name: "Amara" }, { $set: { email: "new@example.com" } });
```

Notice the syntax feels close to working with JavaScript objects directly — this is intentional, and part of why MongoDB pairs comfortably with a JavaScript backend like Node.js and Express.

## SQL vs NoSQL: When to Choose Which

Neither approach is strictly "better" — they suit different situations.

**Choose SQL (relational)** when your data has clear, consistent structure, and relationships between different types of data matter a lot — like an e-commerce system tracking orders, customers, and inventory with strict consistency requirements.

**Choose NoSQL (like MongoDB)** when your data is naturally nested or varies in shape between records, when you're iterating quickly and don't want to redesign a rigid schema every time requirements change, or when a single document naturally represents a complete "thing" your application cares about — like a blog post that always includes its own comments nested inside it.

Many real-world companies use both, choosing whichever fits a particular piece of their system best, rather than picking one exclusively for an entire application.

## What's Next

You now understand two very different approaches to storing data. Whichever you choose, your Express server needs a way to actually talk to it — the next lesson covers connecting a database to Express, including safely managing credentials with environment variables.
