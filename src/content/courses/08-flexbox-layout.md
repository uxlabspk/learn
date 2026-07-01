---
title: Flexbox Layout
description: Arrange elements in rows or columns easily using CSS Flexbox properties.
track: CSS Fundamentals
order: 3
minutes: 8
---

## The Problem Flexbox Solves

Before Flexbox, lining up boxes side by side — say, three cards in a row that stay evenly spaced no matter the screen size — required awkward workarounds. Flexbox, short for "flexible box," was built specifically to make one-directional layouts like this simple.

## Turning On Flexbox

You activate Flexbox by setting `display: flex` on a **parent** element. This turns that parent into a **flex container**, and every direct child inside it automatically becomes a **flex item**.

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```

```css
.container {
  display: flex;
}
```

Just that one line changes everything: the three items, which would normally stack vertically as block elements, now line up in a row automatically.

## Controlling Direction

`flex-direction` controls whether items flow in a row or a column:

```css
.container {
  display: flex;
  flex-direction: row; /* default: left to right */
  /* or: column — top to bottom */
}
```

## Aligning Items: The Two Axes

Flexbox works along two axes: the **main axis** (the direction items flow) and the **cross axis** (perpendicular to it). For `row` direction, the main axis is horizontal and the cross axis is vertical.

`justify-content` aligns items along the main axis:

```css
.container {
  display: flex;
  justify-content: center;       /* bunch items in the middle */
  /* also: flex-start, flex-end, space-between, space-around */
}
```

`align-items` aligns items along the cross axis:

```css
.container {
  display: flex;
  align-items: center;           /* vertically center, in row direction */
  /* also: flex-start, flex-end, stretch */
}
```

A very common pattern — perfectly centering something both horizontally and vertically — becomes trivial with Flexbox:

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}
```

## A Practical Example: Navigation Bar

Flexbox shines for navigation bars, where you want a logo on the left and links spread out on the right:

```html
<nav class="navbar">
  <div class="logo">MySite</div>
  <div class="links">
    <a href="/">Home</a>
    <a href="/about">About</a>
  </div>
</nav>
```

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

`space-between` pushes the first item to the far left and the last item to the far right, distributing any extra space evenly between them.

## Letting Items Grow or Shrink

Individual flex items can be told how to behave when there's extra or limited space, using `flex-grow`:

```css
.item {
  flex-grow: 1;
}
```

Setting `flex-grow: 1` on all items makes them share available space equally — useful for equal-width columns that stretch to fill their container.

## What's Next

Flexbox is ideal for one-dimensional layouts — a single row or column. But real pages often need two-dimensional layouts, arranging items in both rows and columns at once. That's exactly what CSS Grid, covered next, was built for.
