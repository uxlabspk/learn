---
title: Branching & Merging
description: Work on isolated features safely using Git branches, then merge them back together.
track: Git & Version Control
order: 2
minutes: 7
---

## Why Branch?

Imagine you're working on a website, and you want to try a risky redesign without breaking the version that's currently working. Git solves this with **branches** — independent, parallel lines of development within the same repository.

Every Git repository starts with one branch, traditionally called `main` (older projects sometimes use `master`). You can create additional branches to isolate new work, then bring that work back into `main` once it's ready.

## Viewing and Creating Branches

To see all branches in your project, and which one you're currently on:

```
git branch
```

The current branch is marked with an asterisk. To create a new branch:

```
git branch new-feature
```

This creates the branch, but doesn't switch to it yet — you're still working on your original branch.

## Switching Branches

To move your working directory onto a different branch, use `checkout` or the newer `switch` command:

```
git checkout new-feature
```

```
git switch new-feature
```

Both do the same thing. `switch` was introduced more recently specifically to make branch-switching clearer, since `checkout` is also used for other, unrelated tasks. A useful shortcut creates and switches in one step:

```
git checkout -b new-feature
```

The `-b` flag means "create this branch, then switch to it immediately."

## Why Branching Is Safe

Changes you make on `new-feature` don't affect `main` at all, until you explicitly bring them together. You can commit freely, experiment, even make mistakes — your `main` branch stays untouched the whole time. This is the entire point of branching: isolation.

```
git switch main
git switch new-feature
```

You can switch back and forth freely, as long as you've committed (or stashed) your current changes first.

## Merging Branches

Once your work on a branch is ready, you **merge** it back into another branch — typically `main`. First, switch to the branch you want to merge *into*:

```
git switch main
git merge new-feature
```

This takes all the commits made on `new-feature` and applies them onto `main`. If the two branches haven't diverged in conflicting ways, Git merges them automatically, with no extra effort from you.

## A Typical Workflow

```
git checkout -b add-contact-form
# ... make changes, git add, git commit ...
git switch main
git merge add-contact-form
```

After merging, the branch has served its purpose. Many developers delete it to keep the branch list clean:

```
git branch -d add-contact-form
```

## When to Branch

A good habit is creating a new branch for each distinct piece of work — a new feature, a bug fix, an experiment — rather than making all your changes directly on `main`. This keeps `main` stable and deployable at (almost) all times, and makes it much easier to review, or abandon, one piece of work without affecting anything else.

## What's Next

So far, everything has happened on your own computer. The next lesson introduces GitHub, where you'll learn to push your branches to a shared, online repository — and open pull requests to propose merging your work into someone else's project.
