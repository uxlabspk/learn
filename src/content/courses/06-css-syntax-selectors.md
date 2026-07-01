---
title: CSS Syntax & Selectors
description: Learn CSS rule syntax and how to target HTML elements with different selectors.
track: CSS Fundamentals
order: 1
minutes: 7
---

## What Is CSS?

CSS stands for Cascading Style Sheets. If HTML is the skeleton of a page, CSS is the skin, clothes, and makeup — it controls color, spacing, fonts, and layout. Without CSS, every website would look like plain black text on a white background.

## The Anatomy of a CSS Rule

A CSS **rule** has three parts: a selector, a property, and a value.

```css
p {
  color: blue;
}
```

Here, `p` is the **selector** — it tells the browser which elements to style (in this case, every `<p>` element). Inside the curly braces is a **declaration**: `color` is the **property** being changed, and `blue` is the **value** it's being set to. You can include multiple declarations in one rule, each ending with a semicolon:

```css
p {
  color: blue;
  font-size: 16px;
  margin-bottom: 10px;
}
```

## Connecting CSS to HTML

There are three ways to add CSS to a page, but the best practice is a separate `.css` file, linked in the `<head>`:

```html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
```

This keeps your structure (HTML) and your styling (CSS) cleanly separated, which makes both easier to maintain.

## Selectors: Targeting Elements

### Element Selectors

The simplest selector targets a tag name directly, styling every matching element on the page:

```css
h1 {
  color: darkgreen;
}
```

### Class Selectors

A **class** is a custom label you add to HTML elements using the `class` attribute, then target with a dot (`.`) in CSS. Classes are reusable — many elements can share the same class.

```html
<p class="highlight">Important text</p>
<p class="highlight">Also important</p>
```

```css
.highlight {
  background-color: yellow;
}
```

### ID Selectors

An **id** is similar to a class, but it must be unique — only one element per page should use a given id. Target it with a hash (`#`) in CSS.

```html
<div id="main-banner">Welcome</div>
```

```css
#main-banner {
  font-size: 24px;
}
```

## Specificity: Which Rule Wins?

Sometimes multiple CSS rules target the same element with conflicting values. When that happens, the browser uses **specificity** to decide which one wins. As a rough rule, more specific selectors beat more general ones:

1. ID selectors (`#main-banner`) are the most specific
2. Class selectors (`.highlight`) are next
3. Element selectors (`p`) are the least specific

```css
p { color: black; }
.highlight { color: yellow; }
#main-banner { color: red; }
```

If an element has all three — it's a `<p>`, with class `highlight`, and id `main-banner` — the id rule wins, and the text appears red. When selectors are equally specific, the one written **later** in the CSS file wins.

## What's Next

Now that you can target and style elements, the next lesson covers the box model — how every HTML element is really a rectangular box with content, padding, borders, and margin, and how understanding that shapes your entire layout.
