<div align="center">

# CodeHunts Learn

### Free coding courses and articles for everyone.

A **fully static** learning platform for `learn.codehuntspk.com`. No server, no database, no login required.

Built with React + TypeScript + Vite. Content lives in Markdown files — add a lesson, push, done.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-00C853?style=flat-square)](LICENSE)

</div>

---

## Why CodeHunts Learn?

Most course platforms require accounts, databases, and server-side logic. CodeHunts Learn is different. Every lesson is a Markdown file. The site builds to static HTML. Upload to any host and it just works.

> "The best course platform is the one that doesn't need a backend."

---

## Features

### Zero Backend

No API, no database, no authentication. The entire site is static files generated at build time. Host it anywhere — Hostinger, Netlify, a USB stick.

### Markdown-First Content

Write lessons in Markdown with simple frontmatter. Create a `.md` file, fill in the metadata, push. The site picks it up automatically on the next build.

### Track-Based Organization

Lessons are grouped into tracks (like "CSS Fundamentals" or "JavaScript Basics"). The homepage and courses page display them as trails with ordered lessons.

### PDF Attachments

Optionally attach downloadable PDF cheatsheets to any lesson. Drop the file in `public/pdfs/` and set the `pdf` field in frontmatter.

### Built-In Routing

Apache-compatible `.htaccess` handles client-side routing. Works on Hostinger without extra configuration.

### And more

- **Auto-discovery** — new `.md` files are detected at build time, no wiring needed
- **Frontmatter metadata** — title, description, track, order, minutes, PDF
- **Responsive design** — works on desktop and mobile
- **Google Fonts** — loaded via `<link>` tags, easily self-hosted if preferred

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm

### Run it

```bash
git clone https://github.com/your-repo/codehunts-learn.git
cd codehunts-learn
npm install
npm run dev
```

Opens at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

Outputs a fully static site into `dist/` — upload that folder to your host.

---

## How content works

Every lesson is a Markdown file in `src/content/courses/`. Example:

```md
---
title: Flexbox Basics
description: One-line summary shown on the course cards.
track: CSS Fundamentals
order: 1
minutes: 10
pdf: /pdfs/flexbox-cheatsheet.pdf   # optional
---

Your lesson content here, written in normal Markdown.
Headings, `code`, lists, > blockquotes, and fenced code blocks
all render automatically.
```

| Field | Purpose |
|-------|---------|
| `title` | Lesson title shown on cards |
| `description` | One-line summary for course listing |
| `track` | Groups lessons into a trail |
| `order` | Controls sequence within a track |
| `minutes` | Estimated reading time |
| `pdf` | Optional PDF download link |

---

## Project Structure

```
src/
  content/courses/   ← your lessons (Markdown)
  pages/             ← Home, Courses, CourseDetail, NotFound
  components/        ← Layout (header/footer)
  lib/content.ts     ← loads & parses Markdown at build time
public/
  pdfs/              ← downloadable cheatsheets
  .htaccess          ← Apache routing
```

---

## Configuration

No config files to edit. Content is driven entirely by Markdown frontmatter. Site settings (title, fonts, etc.) live in `index.html` and `vite.config.ts`.

---

## Contributing

1. Fork it
2. Create a branch (`git checkout -b feat/my-lesson`)
3. Add your `.md` file in `src/content/courses/`
4. Commit (`git commit -m 'Add new lesson'`)
5. Push (`git push origin feat/my-lesson`)
6. Open a PR

---

## Notes

- No backend, no database, no user accounts — by design. If you later want logins/progress-tracking, that would need adding a PHP+MySQL API.
- Fonts are loaded from Google Fonts via `<link>` tags in `index.html`. They can be self-hosted if preferred.

---

## License

MIT — do whatever you want with it.

---

**If CodeHunts Learn saves you from building another course platform from scratch, give it a star.**

It helps others find it, and tells us this is worth continuing.

[⭐ Star this repo](https://github.com/your-repo/codehunts-learn/stargazers)
