---
title: "Collaborating on Git: Conflicts & Best Practices"
description: Resolve merge conflicts confidently and follow good commit and gitignore habits.
track: Git & Version Control
order: 4
minutes: 7
---

## What Is a Merge Conflict?

A **merge conflict** happens when Git tries to combine two branches that have changed the *same lines* of the *same file* in different ways. Git can't automatically decide which version is correct, so it pauses and asks you to resolve the conflict by hand.

Conflicts are a normal, expected part of collaborating — not a sign you've done something wrong. Every developer encounters them regularly.

## What a Conflict Looks Like

When a conflict occurs, Git marks the affected section of the file with special conflict markers:

```
<<<<<<< HEAD
  <h1>Welcome to Our Site</h1>
=======
  <h1>Welcome to Our Store</h1>
>>>>>>> new-feature
```

`<<<<<<< HEAD` marks the start of your current branch's version. `=======` separates the two versions. `>>>>>>> new-feature` marks the end of the incoming branch's version. Git leaves both versions in the file and waits for you to decide.

## Resolving a Conflict

To resolve it, edit the file directly: delete the version you don't want, along with all three marker lines, keeping only the correct final content:

```
<h1>Welcome to Our Store</h1>
```

Once every conflict in the file is resolved, stage and commit as usual:

```
git add index.html
git commit -m "Resolve merge conflict in header text"
```

Git recognizes that the conflict markers are gone and treats the commit as the resolution.

## Reducing Conflicts

You can't avoid conflicts entirely, but a few habits reduce how often they happen:

- **Pull frequently** — the longer your branch diverges from `main` without updating, the more likely a conflict becomes
- **Keep branches focused and short-lived** — a branch that touches one feature for a few days is far less risky than one that lives for months
- **Communicate with teammates** — if you know two people are editing the same file, a quick conversation can prevent overlapping work entirely

## Writing Good Commit Messages

A clear commit history is one of the most valuable things a team can maintain. A widely used convention structures messages like this:

```
git commit -m "Fix broken submit button on contact form"
```

Good commit messages are written in the present tense ("Fix," not "Fixed"), are specific rather than vague, and describe the *reason* or *effect* of a change rather than just listing file names. Compare:

```
git commit -m "changes"          # unhelpful
git commit -m "Fix broken submit button on contact form"  # clear
```

Six months later, a clear message saves enormous time when trying to understand why a particular change was made.

## .gitignore Hygiene

As covered earlier, `.gitignore` prevents unwanted files from being tracked. Good hygiene means setting this up **before** your first commit, since files already tracked by Git won't be automatically removed just by adding them to `.gitignore` later — they need to be explicitly untracked first. Common candidates for `.gitignore` include dependency folders, build output, environment files with secrets, and editor-specific configuration files.

## What's Next

You've now completed the Git & Version Control track — the essential workflow every professional developer uses daily. Next, the course moves into React Basics, starting with `useState`, the tool that lets your interfaces remember and update information as users interact with them.
