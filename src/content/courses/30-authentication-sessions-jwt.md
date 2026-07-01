---
title: "Authentication Basics: Sessions & JWT"
description: Understand what authentication solves and compare sessions to JSON Web Tokens.
track: Backend with Node.js & Express
order: 6
minutes: 8
---

## What Problem Does Authentication Solve?

**Authentication** is the process of verifying who a user is — typically through a username and password at login. It's distinct from **authorization**, which determines what an already-identified user is *allowed* to do. Every application that has user accounts needs some authentication strategy, and the two dominant approaches are sessions and tokens (most commonly JWTs).

## The Core Challenge: HTTP Is Stateless

HTTP, the protocol underlying nearly all web traffic, is **stateless** — each request is handled independently, with no built-in memory of previous requests. This creates a problem: after a user logs in successfully, how does the server know, on their *next* request, that they're still logged in? Both sessions and JWTs solve this same core problem, in different ways.

## Sessions

With **session-based authentication**, after a user logs in, the server creates a **session** — a record, stored on the server, containing information about that logged-in user. The server sends the browser a small piece of data called a **cookie**, containing a unique session ID. On every subsequent request, the browser automatically includes that cookie, and the server looks up the matching session.

The key characteristic of sessions is that the server tracks every logged-in user, in memory or a database. This gives the server full control — a session can be instantly invalidated simply by deleting it.

## JWT (JSON Web Tokens)

A **JWT** takes a different approach. Instead of the server storing session data, all the necessary information about a logged-in user is packed directly into a signed **token**, handed to the client after login. On every subsequent request, the client includes this token, and the server verifies it's genuine using a cryptographic signature — without looking anything up in a database.

```
header.payload.signature
```

A JWT has three parts, separated by dots: a header describing the token type, a payload containing data (like a user ID), and a signature that proves the token hasn't been tampered with since the server issued it.

The key characteristic of JWTs is that the server doesn't need to store anything — the token itself carries all the necessary information, and verification is just a cryptographic check. This makes JWTs popular for APIs used by multiple different services, since none of them need shared access to a central session store.

## Sessions vs JWT: A High-Level Comparison

| | Sessions | JWT |
|---|---|---|
| Where is state stored? | On the server | Inside the token itself |
| Can you instantly revoke access? | Yes, easily | Difficult — the token stays valid until it expires |
| Good fit for | Traditional web apps, one server | APIs, multiple services, mobile apps |

Neither approach is universally "better" — the right choice depends on your application's architecture. A simple website with one server often reaches for sessions, for their simplicity and easy revocation. An API serving multiple client applications (a website, a mobile app, third-party integrations) often reaches for JWTs, since any service holding a valid token can verify it independently.

## A Word on Security

Authentication is one of the most security-sensitive parts of any application. Passwords should never be stored as plain text — they should be **hashed**, a one-way transformation that makes the original unrecoverable, even if a database is compromised. Building authentication from scratch is genuinely difficult; most production apps use well-tested libraries instead.

## What's Next

You've completed the Backend with Node.js & Express track — servers, routing, REST design, and authentication concepts. A server is only half of most applications, though; the next track covers Databases, starting with SQL basics — how structured data is actually stored and retrieved.
