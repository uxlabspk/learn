---
title: "Working with GitHub: Push, Pull, PRs"
description: Sync local repositories with GitHub using push and pull, and open pull requests.
track: Git & Version Control
order: 3
minutes: 8
---

## Git vs GitHub

It's worth being precise about a common confusion: **Git** is the version control tool that runs on your computer. **GitHub** is a separate website that hosts Git repositories online, adding collaboration features on top — like sharing code, reviewing changes, and tracking issues. You can use Git without GitHub, but GitHub relies on Git underneath.

## Remote Repositories

A **remote** is a version of your repository stored somewhere other than your own computer — typically on GitHub. Your local repository can be connected to a remote, allowing you to sync changes between the two.

When you create a repository on GitHub and connect it to your local project, Git refers to it by a short name, conventionally `origin`:

```
git remote add origin https://github.com/username/project-name.git
```

You can check which remotes are configured with:

```
git remote -v
```

## Pushing: Local to Remote

**Push** sends your local commits up to the remote repository, making them available on GitHub:

```
git push origin main
```

This pushes the `main` branch to the `origin` remote. The first time you push a new branch, you'll often see Git suggest adding `-u` (or `--set-upstream`), which remembers this connection so future pushes just need `git push`.

## Pulling: Remote to Local

**Pull** does the opposite — it fetches changes from the remote and merges them into your local branch:

```
git pull origin main
```

This is essential when collaborating: if a teammate has pushed changes to `main` that you don't have locally, pulling brings your copy up to date before you continue working.

## Cloning: Copying an Entire Repository

If a repository already exists on GitHub and you want a full local copy, use `clone` instead of `init`:

```
git clone https://github.com/username/project-name.git
```

This downloads the entire project, including its full commit history, and automatically sets up `origin` pointing back to the source.

## Pull Requests: Proposing Changes

A **pull request** (often abbreviated PR) is a GitHub feature — not a Git command — for proposing that changes from one branch be merged into another, typically with a review step in between. This is the standard way teams collaborate on shared codebases.

The typical workflow looks like this:

1. Create a branch and commit your changes locally
2. Push that branch to GitHub: `git push origin your-branch-name`
3. On GitHub's website, open a pull request comparing your branch to `main`
4. Teammates review the code, leave comments, and request changes if needed
5. Once approved, the pull request is merged into `main` through GitHub's interface

Pull requests are valuable because they create a visible record of *why* a change was made, give others a chance to catch mistakes before they reach the main codebase, and keep a searchable history of every significant change to the project.

## A Typical Full Cycle

```
git checkout -b fix-header-spacing
# ... make changes, git add, git commit ...
git push origin fix-header-spacing
```

Then open the pull request on GitHub's website, and wait for review before merging.

## What's Next

You now know how to sync work with GitHub and propose changes through pull requests. The final Git lesson covers what happens when two people edit the same lines of code — merge conflicts — along with best practices for writing good commit messages and keeping a healthy repository.
