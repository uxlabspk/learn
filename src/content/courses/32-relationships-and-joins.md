---
title: Relationships & Joins
description: Connect related tables using primary and foreign keys, and query them with JOIN.
track: Databases
order: 2
minutes: 7
---

## Why Split Data Across Tables?

Imagine storing blog posts in a single table, with the author's name and email repeated in every single row for every post they've written. If that author changes their email, you'd need to update dozens of rows, and any inconsistency between them would cause real bugs. Relational databases solve this by splitting related data into separate tables, then **relating** them together.

## Primary Keys

A **primary key** is a column (usually `id`) that uniquely identifies each row in a table. No two rows in the same table can share a primary key value, and it's how other tables refer back to a specific row.

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT,
  email TEXT
);
```

## Foreign Keys

A **foreign key** is a column in one table that stores the primary key value from another table, creating a link between them.

```sql
CREATE TABLE posts (
  id INTEGER PRIMARY KEY,
  title TEXT,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

Here, `posts.user_id` is a foreign key referencing `users.id`. Each post stores just the author's `id`, not their name or email — if you need that information, you look it up in the `users` table through this link.

## One-to-Many Relationships

The pattern above — one user having many posts — is called a **one-to-many relationship**, one of the most common relationship types in database design. One user can be linked to many posts, but each individual post belongs to exactly one user.

| posts table | | |
|---|---|---|
| id | title | user_id |
| 1 | "My First Post" | 1 |
| 2 | "Another Post" | 1 |
| 3 | "Hello World" | 2 |

Here, user `1` (Amara, from the previous lesson) has written two posts, and user `2` (Deshi) has written one.

## JOIN: Querying Across Tables

A `JOIN` combines rows from two tables based on a matching column — typically a foreign key matching a primary key. This lets you retrieve related data from both tables in a single query.

```sql
SELECT posts.title, users.name
FROM posts
JOIN users ON posts.user_id = users.id;
```

This query reads: "get the `title` from `posts` and the `name` from `users`, for every post, matched to its author using `posts.user_id = users.id`." The result combines information from both tables into one unified result:

| title | name |
|---|---|
| My First Post | Amara |
| Another Post | Amara |
| Hello World | Deshi |

Without the `JOIN`, you'd need two separate queries and would have to manually match up the results yourself in your application code — `JOIN` lets the database do that matching efficiently, in one step.

## Other Join Types (Briefly)

The example above is technically an `INNER JOIN` (the default), which only returns rows where a match exists in both tables. There are other join types — like `LEFT JOIN`, which also includes rows from the first table even when no match exists in the second — but `INNER JOIN` covers the vast majority of everyday use cases you'll encounter as a beginner.

## What's Next

You now understand how relational databases connect data across tables. Not every database works this way, though — the next lesson introduces MongoDB, a fundamentally different, document-based approach, and discusses when you might reach for one style over the other.
