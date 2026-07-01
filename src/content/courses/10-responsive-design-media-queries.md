---
title: Responsive Design & Media Queries
description: Make layouts adapt to different screen sizes using media queries and mobile-first design.
track: CSS Fundamentals
order: 5
minutes: 7
---

## Why Responsive Design Matters

People visit websites on all sorts of devices: phones, tablets, laptops, huge desktop monitors. **Responsive design** means building a page that adjusts its layout to look good and function well on all of them, rather than forcing every visitor to squint at a desktop-sized layout on a tiny phone screen.

## The Viewport Meta Tag

Before any responsive CSS works correctly, your HTML needs one crucial line in the `<head>`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Without this tag, mobile browsers assume your page was built for a desktop and automatically zoom out to fit it, making text tiny and unreadable. This meta tag tells the browser: "match the page width to the actual device width, and start at normal zoom." Always include it — it's easy to forget and breaks mobile layouts silently.

## Media Queries

A **media query** is a CSS rule that only applies under certain conditions — most commonly, screen width. This is the core tool of responsive design.

```css
.container {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
}
```

Here, the container stacks items in a column by default. But once the screen is at least 768 pixels wide (`min-width: 768px`), the second rule kicks in and switches it to a row layout. The `@media` block only applies its styles when the condition is true.

## Mobile-First Design

**Mobile-first** is a strategy where you write your base CSS for small screens first, then use `min-width` media queries to add complexity as the screen gets bigger. This is the opposite of designing for desktop and shrinking down.

```css
/* Base styles: apply to all screens, mobile included */
.card {
  width: 100%;
  padding: 10px;
}

/* Enhance for tablets and up */
@media (min-width: 600px) {
  .card {
    width: 48%;
  }
}

/* Enhance further for desktop */
@media (min-width: 1000px) {
  .card {
    width: 30%;
  }
}
```

This approach tends to produce simpler, more maintainable CSS, because you're only ever adding rules, not fighting to undo desktop styles for smaller screens.

## Common Breakpoints

A **breakpoint** is the screen width where your layout changes. There's no single "correct" set of breakpoints, but common starting points are:

- Small phones: below 480px
- Tablets: around 768px
- Desktops: around 1024px and up

Rather than memorizing exact numbers, a good practice is to resize your browser window slowly and add a breakpoint wherever the layout actually starts to look broken.

## Flexible Images

Images should also adapt to their container, or they'll overflow on small screens:

```css
img {
  max-width: 100%;
  height: auto;
}
```

`max-width: 100%` ensures an image never grows wider than its parent container, while `height: auto` keeps its proportions intact as it shrinks.

## What's Next

You can now build layouts that adapt across devices. The final CSS lesson pulls everything together with colors, typography, and spacing systems — the visual details that turn a functional layout into a polished, professional-looking design.
