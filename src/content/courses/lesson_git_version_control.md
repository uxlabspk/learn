---
title: Git & Version Control
description: Learn how to track changes in your code using Git.
track: developer
order: 4
minutes: 15
---

# Git & Version Control

Git is a powerful system used to track changes in your source code over time. It allows you to revert to previous versions, collaborate with others, and manage complex projects safely. Understanding Git is a crucial skill for any web developer.

## Git Basics: Init, Add, Commit

Git operates by tracking changes in three main stages:

1.  **Initialize (`git init`):** This command turns a regular folder into a Git repository. It creates a hidden `.git` directory inside your project folder, which is where Git stores all its history.
2.  **Add (`git add`):** This command stages the changes you want to include in the next snapshot. You tell Git exactly which files you want to track.
3.  **Commit (`git commit`):** This takes the staged changes and saves them permanently into the repository's history as a snapshot, along with a descriptive message explaining what you changed.
4.  **Status (`git status`):** This command shows you which files have been modified, staged, or are untracked.

```bash
# 1. Initialize a new repository in the current folder
git init

# 2. Create a new file (e.g., index.html)
# ... (edit file)

# 3. Stage the changes to be committed
git add index.html

# 4. Commit the staged changes with a message
git commit -m "Initial commit: Setup basic HTML structure"
```

## Branching & Merging

Branching allows you to work on new features or fixes in isolation without breaking the main, working version of your code.

*   **Branching (`git branch`):** Creating a new line of development.
*   **Switching (`git checkout` or `git switch`):** Moving your working environment to a different branch.
*   **Merging (`git merge`):** Combining the changes from one branch into another.

Working on a feature in a separate branch keeps your main code stable.

```bash
# Create a new branch for a new feature
git branch feature/login-page

# Switch to the new branch
git checkout feature/login-page

# Make changes and commit them on this branch...
git add .
git commit -m "Implemented login form logic"

# Switch back to the main branch to integrate changes
git checkout main

# Merge the feature branch back into the main branch
git merge feature/login-page
```

## Working with GitHub

GitHub is a web-based hosting service for Git repositories. It allows you to collaborate with others online.

*   **Push (`git push`):** Uploads your local commits to the remote repository on GitHub.
*   **Pull (`git pull`):** Downloads the latest changes from the remote repository to your local machine.
*   **Pull Requests (PRs):** This is the collaboration process. When you finish a feature branch, you open a Pull Request on GitHub, asking teammates to review your code before merging it into the main project.

## Collaborating on Git: Conflicts & Best Practices

When two people edit the same line of code, Git won't know which change to keep. This is called a **merge conflict**.

When a conflict happens, Git pauses the merge process, and you must manually open the conflicting files, choose which lines of code to keep, and then commit the resolution.

**Best Practices:**

1.  **Clean Commit Messages:** Write clear, concise messages that explain *what* the commit does, not just *what* you changed.
2.  **.gitignore Hygiene:** Use a `.gitignore` file to tell Git which files (like temporary files, dependency folders, or local configuration files) should *never* be tracked by Git. This keeps your repository clean and small.

```gitignore
# Example .gitignore file contents
/node_modules/  # Ignore large dependency folders
*.log           # Ignore log files
.env            # Ignore sensitive environment variables
```

---

You have learned the essential tools for version control with Git. You can now track your code changes and collaborate effectively. In the final lesson, we will discuss how to take all these pieces—HTML, CSS, and JavaScript—and combine them into a fully functional, dynamic web application!