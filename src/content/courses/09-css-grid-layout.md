---
title: CSS Grid Layout
description: Build two-dimensional layouts with rows and columns using CSS Grid.
track: CSS Fundamentals
order: 4
minutes: 8
---

## Flexbox vs Grid

In the last lesson, you learned Flexbox handles layout in one direction at a time — a row, or a column. **CSS Grid** does something Flexbox can't: it controls rows and columns *simultaneously*, making it the right tool for true two-dimensional layouts, like a photo gallery or a full page layout with a header, sidebar, and footer.

## Turning On Grid

Just like Flexbox, you activate Grid with a `display` property on a parent element:

```css
.container {
  display: grid;
}
```

By itself, this doesn't do much yet — you still need to define the actual grid structure.

## Defining Columns

`grid-template-columns` defines how many columns exist and how wide each one is:

```css
.container {
  display: grid;
  grid-template-columns: 200px 200px 200px;
}
```

This creates three columns, each exactly 200 pixels wide. Any direct child of `.container` will automatically flow into these columns, wrapping to a new row once the columns are full.

## The fr Unit

Typing out fixed pixel widths gets tedious and inflexible. CSS Grid introduces the `fr` unit, short for **fraction**, which divides available space proportionally:

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
```

This creates three equal-width columns that automatically resize as the container's width changes — no media queries required for this part. You can also mix proportions:

```css
.container {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
```

Here the first column takes up twice as much space as the second.

## Gaps Between Items

Instead of using margin on individual items (which gets messy), Grid provides a clean `gap` property:

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}
```

This adds 20 pixels of space between every row and column, without adding any extra space around the outer edge of the grid.

## A Practical Example: Photo Gallery

```html
<div class="gallery">
  <img src="photo1.jpg" alt="Mountain landscape">
  <img src="photo2.jpg" alt="City skyline">
  <img src="photo3.jpg" alt="Beach sunset">
</div>
```

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
```

The `repeat()` function is shorthand — `repeat(3, 1fr)` means "repeat `1fr` three times," which is identical to writing `1fr 1fr 1fr` but easier to read and adjust.

## Placing Items Explicitly

By default, items fill the grid in order, left to right, top to bottom. But you can also place a specific item in a specific spot using `grid-column` and `grid-row`:

```css
.featured {
  grid-column: 1 / 3;
}
```

This tells an item labeled `.featured` to span from grid line 1 to grid line 3 — effectively taking up two columns' worth of space, making it stand out from the rest of the grid.

## What's Next

You now have two powerful layout tools: Flexbox for one direction, Grid for two. But so far, everything has assumed one screen size. The next lesson covers responsive design — making layouts adapt gracefully across phones, tablets, and desktops.
