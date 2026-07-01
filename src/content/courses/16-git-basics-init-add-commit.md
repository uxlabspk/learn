---
title: "Git Basics: Init, Add, Commit"
description: Track changes to your code with Git's core commands and understand .gitignore.
track: Git & Version Control
order: 1
minutes: 7
---

## What Is Git, and Why Does It Matter?

**Git** is a version control system — a tool that tracks changes to your files over time, letting you save snapshots of your work and go back to any previous point if something breaks. Think of it like an extremely detailed "undo history" for an entire project, not just the last few keystrokes.

Git runs entirely on your own computer (unlike GitHub, which is a separate website for hosting Git projects online — covered in a later lesson). You interact with Git primarily through the command line.

## Starting a Repository

A **repository** (often shortened to "repo") is a project folder that Git is tracking. To turn any folder into a Git repository, run:

```
git init
```

This creates a hidden `.git` folder inside your project, where Git stores all its tracking information. You only need to run `git init` once per project.

## The Three-Stage Workflow

Git organizes changes through three stages: your **working directory** (the actual files you're editing), the **staging area** (changes you've marked as ready to save), and the **repository** (the permanent saved history). Understanding this flow is the key to understanding Git.

### Checking Status

At any point, you can check what Git sees as changed with:

```
git status
```

This shows which files have been modified, which are staged, and which aren't being tracked at all. It's one of the most frequently used Git commands — run it often.

### Staging Changes

Before you can save changes permanently, you must **stage** them — telling Git "these are the changes I want to include in my next snapshot":

```
git add index.html
git add .
```

`git add index.html` stages one specific file. `git add .` stages every changed file in the current folder and its subfolders — a very common shortcut.

### Committing Changes

A **commit** is a saved snapshot of your staged changes, along with a message describing what changed:

```
git commit -m "Add navigation bar to homepage"
```

The `-m` flag lets you write the commit message directly in the command. Good commit messages are short, specific, and describe *what* changed, written as if completing the sentence "This commit will...".

## Ignoring Files with .gitignore

Not every file in your project should be tracked by Git — things like temporary files, personal notes, or dependency folders (like `node_modules`, which can be huge and regenerated automatically) are usually excluded. A `.gitignore` file lists patterns Git should skip entirely:

```
node_modules/
.env
*.log
```

Each line is a pattern. `node_modules/` ignores that entire folder. `.env` ignores a specific file (often used to store secret credentials — never commit these). `*.log` ignores any file ending in `.log`, using `*` as a wildcard.

## The Full Basic Cycle

Putting it together, a typical Git workflow looks like:

```
git status
git add .
git commit -m "Fix broken image links"
```

You'll repeat this cycle constantly — make changes, stage them, commit them — building up a detailed history of your project over time.

## What's Next

You now know how to save snapshots of your work. Next, you'll learn about branching — a way to work on new features or experiments in an isolated space, without disturbing your main, working codebase.
