---
title: "SQL Basics: Tables & Queries"
description: Understand database tables and write basic SQL queries for CRUD operations.
track: Databases
order: 1
minutes: 7
---

## What Is a Database?

A **database** is organized storage for data that needs to persist — that is, remain saved even after a program stops running or a server restarts. While your React state and JavaScript variables disappear the moment a page reloads, a database keeps data safely stored, ready to be retrieved later. **SQL** (Structured Query Language) is the standard language for interacting with a specific category of databases, called relational databases.

## Tables, Rows, and Columns

A relational database organizes data into **tables**, which look much like spreadsheets. Each table represents one type of entity — like `users` or `products`.

| id | name | email |
|----|------|-------|
| 1 | Amara | amara@example.com |
| 2 | Deshi | deshi@example.com |

Each **column** represents one piece of information every entry shares (`name`, `email`). Each **row** represents one individual record — one actual user, in this case. This table has two columns of data (`name` and `email`) plus an `id` column, which uniquely identifies each row.

## SELECT: Reading Data

The `SELECT` statement retrieves data from a table. To get everything from the `users` table:

```sql
SELECT * FROM users;
```

The asterisk (`*`) means "all columns." To retrieve only specific columns:

```sql
SELECT name, email FROM users;
```

## WHERE: Filtering Results

`WHERE` narrows down which rows are returned, based on a condition:

```sql
SELECT * FROM users WHERE id = 1;
```

This returns only the row where the `id` column equals `1`. You can use comparison operators like `=`, `>`, `<`, and combine conditions with `AND` / `OR`:

```sql
SELECT * FROM users WHERE name = 'Amara' AND id > 0;
```

## INSERT: Creating Data

`INSERT INTO` adds a new row to a table:

```sql
INSERT INTO users (name, email) VALUES ('Priya', 'priya@example.com');
```

This specifies which columns to fill in (`name`, `email`) and provides the corresponding values, in the same order. The `id` column is typically left out — most databases automatically assign a new, unique id for each new row.

## UPDATE: Modifying Data

`UPDATE` changes existing rows, and almost always needs a `WHERE` clause to specify exactly which ones:

```sql
UPDATE users SET email = 'newemail@example.com' WHERE id = 1;
```

This is important to get right: if you forget the `WHERE` clause, the `UPDATE` applies to **every row** in the entire table — a common and costly mistake.

## DELETE: Removing Data

`DELETE` removes rows, and follows the same pattern:

```sql
DELETE FROM users WHERE id = 1;
```

Just like `UPDATE`, omitting `WHERE` here deletes every row in the table. Always double-check your `WHERE` clause before running `UPDATE` or `DELETE` statements, especially on real data.

## Putting the Four Together: CRUD

`SELECT`, `INSERT`, `UPDATE`, and `DELETE` together form what's often called **CRUD**: Create, Read, Update, Delete — the four fundamental operations almost every application performs on its data, whether the "data" is a user account, a blog post, or a shopping cart item.

## What's Next

You now know how to interact with a single table. But real applications almost always need multiple related tables working together — the next lesson covers relationships and joins, showing how tables can reference each other and be queried together.
