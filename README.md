# CodeHunts Learn

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

---

## Deploying to Hostinger (learn.codehuntspk.com)

**1. Create the subdomain** (skip if already done)
In hPanel: **Domains → Subdomains** → create `learn` on `codehuntspk.com`. Hostinger will create a folder, usually `public_html/learn` (sometimes shown as `learn.codehuntspk.com`).

**2. Build the project**
```bash
npm run build
```

**3. Upload the contents of `dist/`**
Using hPanel's **File Manager** (or an FTP client like FileZilla with your Hostinger FTP credentials):
- Go into the subdomain's folder (e.g. `public_html/learn`)
- Upload **everything inside `dist/`** (not the `dist` folder itself) — so `index.html`, the `assets/` folder, `.htaccess`, and `pdfs/` should sit directly in that folder.

**4. Confirm `.htaccess` made it**
File Manager sometimes hides dotfiles. Turn on "Show hidden files" in File Manager settings and confirm `.htaccess` is present in the subdomain folder — without it, visiting a lesson URL directly (or refreshing on one) will 404.

**5. Visit `learn.codehuntspk.com`**
It can take a few minutes for DNS/SSL to fully propagate the first time a subdomain is created. Hostinger issues a free SSL certificate automatically — if the site loads without `https`, check **hPanel → SSL** and issue/attach one to the subdomain.

### Updating content later

Whenever you add or edit a lesson: edit the `.md` file → `npm run build` → re-upload the new contents of `dist/` (you can overwrite the old files). Nothing on the server needs to change.

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

- No backend, no database, no user accounts — by design, per the current scope. If you later want logins/progress-tracking, that would need adding a PHP+MySQL API (Hostinger shared hosting supports both) or a hosted service like Supabase.
- Fonts are loaded from Google Fonts via `<link>` tags in `index.html`. If you'd rather not depend on Google Fonts, they can be self-hosted instead.
