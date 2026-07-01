---
title: Semantic HTML & Accessibility Basics
description: Use meaningful HTML tags like header, nav, and main to improve accessibility and SEO.
track: HTML Basics
order: 5
minutes: 7
---

## What Does "Semantic" Mean?

A **semantic** HTML element is one whose tag name describes its meaning, not just its appearance. Compare these two examples:

```html
<div class="top-section">...</div>
```

```html
<header>...</header>
```

Both might look identical on screen, but only the second one tells the browser, screen readers, and search engines *what this section actually is*. `<div>` is a generic, meaningless box — useful, but it says nothing about the content inside it.

## Common Semantic Elements

Instead of building every page out of generic `<div>` boxes, HTML gives us purpose-built tags for common page regions:

```html
<header>
  <h1>My Website</h1>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>

<main>
  <section>
    <h2>Latest Articles</h2>
    <p>Welcome to my blog...</p>
  </section>
</main>

<footer>
  <p>&copy; 2026 My Website</p>
</footer>
```

Here's what each one means:

- `<header>` — introductory content, often a logo and title, usually at the top
- `<nav>` — a block of navigation links
- `<main>` — the primary content of the page, unique to that page (used once per page)
- `<section>` — a distinct grouping of related content, usually with its own heading
- `<footer>` — closing content, like copyright info or contact links, usually at the bottom

There are more, like `<article>` for self-contained content (a blog post, a news story) and `<aside>` for tangential content (a sidebar).

## Why Semantics Matter: Screen Readers

A **screen reader** is software that reads webpage content aloud for users who are blind or have low vision. Screen readers rely heavily on semantic structure to help users navigate efficiently.

With semantic HTML, a screen reader user can jump straight to `<nav>` to find the menu, or straight to `<main>` to skip repetitive headers and get to the actual content. If your entire page is built from unlabeled `<div>` tags, none of that navigation is possible — the user is stuck listening to everything in order.

## Why Semantics Matter: SEO

**SEO** stands for search engine optimization — the practice of helping search engines like Google understand and rank your page. Search engines read semantic tags to figure out what's important. A heading inside `<main>` is treated as more significant than the same text buried in a `<footer>` or `<aside>`. Clear structure tends to correlate with better search rankings.

## A Quick Rule of Thumb

Ask yourself: "Does this element have a specific role, or is it just a generic container for styling?" If it has a role — navigation, main content, a footer — reach for a semantic tag. If it's purely for grouping things visually with no inherent meaning, `<div>` (or `<span>` for inline content) is still the right, honest choice.

```html
<!-- Good: meaningful structure -->
<article>
  <h2>How to Bake Bread</h2>
  <p>Start with good flour...</p>
</article>

<!-- Fine: no inherent meaning, just visual grouping -->
<div class="card-wrapper">...</div>
```

## What's Next

You've now covered the full foundation of HTML Basics — structure, text, links, images, forms, and semantics. Next, you'll move into CSS Fundamentals, starting with how to actually select elements and apply style rules to them.
