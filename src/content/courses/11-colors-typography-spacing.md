---
title: Colors, Typography & Spacing Systems
description: Apply consistent color formats, font stacks, and spacing scales for polished design.
track: CSS Fundamentals
order: 6
minutes: 7
---

## Three Ways to Write Colors

CSS supports several formats for specifying color. The three most common are hex, RGB, and HSL.

**Hex codes** use six characters representing red, green, and blue in a base-16 number system:

```css
.box {
  color: #3498db;
}
```

**RGB** spells out red, green, and blue values directly, each from 0 to 255:

```css
.box {
  color: rgb(52, 152, 219);
}
```

**HSL** stands for hue, saturation, and lightness — often the most intuitive for humans to adjust by hand, since you can darken or lighten a color just by changing one number:

```css
.box {
  color: hsl(204, 70%, 53%);
}
```

All three of these produce the exact same shade of blue. Hex is the most common in practice, but HSL is especially handy when you want to create a family of related colors — say, five shades of the same blue — by only changing the lightness value.

## Adding Transparency

Both RGB and HSL have variants ending in "a" (alpha) that add transparency, from 0 (invisible) to 1 (fully opaque):

```css
.overlay {
  background-color: rgba(0, 0, 0, 0.5);
}
```

This creates a semi-transparent black overlay — a common technique for darkening a background image behind text.

## Font Stacks

The `font-family` property doesn't just take one font — it takes a **font stack**, a prioritized list of fonts the browser tries in order:

```css
body {
  font-family: "Helvetica Neue", Arial, sans-serif;
}
```

The browser tries "Helvetica Neue" first. If the visitor's device doesn't have it installed, it falls back to Arial. If that's unavailable too, it uses any generic sans-serif font on the system. This fallback chain guarantees text always renders in *something* reasonable, even on unusual devices.

Font names are grouped into a few generic families: `serif` (fonts with small decorative strokes, like Times New Roman), `sans-serif` (clean fonts without those strokes, like Arial), and `monospace` (fixed-width fonts, common in code).

## A Consistent Spacing Scale

Rather than picking random pixel values (10px here, 13px there, 22px somewhere else), professional CSS tends to follow a **spacing scale** — a fixed, limited set of spacing values reused throughout a project.

A common approach uses multiples of a base number, like 4 or 8:

```css
:root {
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
}

.card {
  padding: var(--space-md);
  margin-bottom: var(--space-lg);
}
```

This example introduces **CSS custom properties** (also called CSS variables), defined with two dashes (`--space-md`) and read with `var()`. Defining spacing once and reusing it everywhere keeps a whole website feeling visually consistent, and makes global adjustments easy — change the variable once, and every use updates automatically.

## Why This Matters

Consistent color use, readable font stacks, and a disciplined spacing scale are what separate a page that "works" from one that looks genuinely professional. These aren't flashy skills, but they're the ones designers and developers rely on constantly.

## What's Next

You've now completed the core of CSS Fundamentals — selectors, the box model, Flexbox, Grid, responsiveness, and visual polish. Next, the course shifts into JavaScript Fundamentals, starting with arrays and objects — the data structures that power almost everything interactive on the web.
