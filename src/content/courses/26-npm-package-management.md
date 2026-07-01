---
title: npm & Package Management
description: Manage project dependencies with npm, package.json, and the difference between dependency types.
track: Backend with Node.js & Express
order: 2
minutes: 7
---

## What Is npm?

**npm** (Node Package Manager) is a tool that comes bundled with Node.js, used to install and manage external code — called **packages** or **dependencies** — that other developers have written and published. Rather than writing every piece of functionality yourself, npm lets you pull in existing, tested code with a single command.

## package.json: The Project's Identity Card

Every Node.js project has a `package.json` file at its root. It describes the project: its name, version, and — most importantly — which packages it depends on.

You create one by running, in your terminal:

```
npm init -y
```

The `-y` flag accepts all the default answers, quickly generating a basic `package.json` without asking you questions interactively. It looks something like this:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {},
  "devDependencies": {}
}
```

## Installing Packages

To add a package to your project, run:

```
npm install express
```

This does two things: it downloads the `express` package (along with anything *it* depends on) into a folder called `node_modules`, and it adds an entry for `express` under `dependencies` in `package.json`. `npm i` is a common shorthand for `npm install`.

## dependencies vs devDependencies

`package.json` distinguishes between two categories of packages.

**dependencies** are packages your application needs to actually *run* — like Express, which handles web server logic that must be present when the app is live.

**devDependencies** are packages only needed *while developing* — like testing tools or code formatters — that aren't required once the application is running in production.

To install something as a dev dependency, add the `--save-dev` flag (or its shorthand, `-D`):

```
npm install --save-dev nodemon
```

```json
{
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

## Why node_modules Isn't Committed to Git

Recall the `.gitignore` lesson: the `node_modules` folder is always added to `.gitignore` and never committed to a Git repository. It can be enormous — sometimes hundreds of megabytes — and, crucially, it's entirely regeneratable. Anyone who clones your project can rebuild it exactly by running:

```
npm install
```

This single command reads `package.json`, downloads every listed dependency (and their dependencies, and so on), and recreates `node_modules` from scratch. This is why `package.json` — not `node_modules` — is the true source of truth for a project's dependencies.

## Running Scripts

`package.json` can also define custom **scripts** — shortcuts for common commands, listed under a `scripts` key:

```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}
```

These are run with `npm run`, followed by the script name:

```
npm run dev
```

`npm start` is a special case that doesn't need the word `run` — just `npm start` works directly, because it's such a common convention.

## What's Next

You now know how to manage a Node.js project's dependencies. With that foundation in place, the next lesson builds your first real web server using Express, the most popular Node.js framework for handling web requests.
