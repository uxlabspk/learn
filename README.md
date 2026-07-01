# CodeHunts Learn Platform

Free coding course/article site for `learn.codehuntspk.com`, built with React + TypeScript + Vite. Fully static — no server-side code, no database, no login required.

## How content works

There's no CMS to log into. Every lesson is a Markdown file in:

```
src/content/courses/
```

Add a new lesson by creating a new `.md` file there, e.g. `css-flexbox.md`:

```md
---
title: Flexbox Basics
description: One-line summary shown on the course cards.
track: CSS Fundamentals
order: 1
minutes: 10
pdf: /pdfs/flexbox-cheatsheet.pdf   # optional, omit if there's no PDF
---

Your lesson content here, written in normal Markdown.
Headings, `code`, lists, > blockquotes, and fenced code blocks
all render automatically.
```

- `track` groups lessons together (shown as a "trail" on the homepage and courses page).
- `order` controls the sequence within that track.
- `pdf` is optional — if set, a "Download PDF" button appears on the lesson. Put the actual PDF file in `public/pdfs/`.

The site picks up new `.md` files automatically the next time you run `npm run build` — nothing else to wire up.

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Building for production

```bash
npm run build
```

This outputs a fully static site into the `dist/` folder — that folder is everything you upload to Hostinger.

## Project structure

```
src/
  content/courses/   ← your lessons (Markdown)
  pages/             ← Home, Courses, CourseDetail, NotFound
  components/        ← Layout (header/footer)
  lib/content.ts      ← loads & parses the Markdown files at build time
public/
  pdfs/              ← downloadable cheatsheets referenced from lessons
  .htaccess          ← makes routing work on Apache/Hostinger
```

## Notes

- No backend, no database, no user accounts — by design, per the current scope. If you later want logins/progress-tracking, that would need adding a PHP+MySQL API 
- Fonts are loaded from Google Fonts via `<link>` tags in `index.html`. If you'd rather not depend on Google Fonts, they can be self-hosted instead.
