---
title: The Box Model
description: Understand how content, padding, border, and margin define every element's size.
track: CSS Fundamentals
order: 2
minutes: 7
---

## Every Element Is a Box

Here's a secret that makes CSS layout click: no matter what an HTML element looks like, the browser treats it as a rectangular box. A button, a paragraph, an image — all boxes. Understanding how these boxes are built is the key to controlling layout.

## The Four Layers

Each box is made of four layers, from the inside out:

1. **Content** — the actual text or image inside the element
2. **Padding** — space between the content and the border, still part of the element
3. **Border** — a line that wraps around the padding
4. **Margin** — space outside the border, separating this element from others

Picture a framed photograph on a wall. The photo itself is the content. The mat around the photo is the padding. The physical frame is the border. The empty wall space around the frame, keeping it apart from other frames, is the margin.

## Seeing It in CSS

```css
.box {
  width: 200px;
  padding: 20px;
  border: 2px solid black;
  margin: 15px;
}
```

```html
<div class="box">Hello</div>
```

This creates a box that is 200 pixels wide at its content, with 20 pixels of padding on all sides, a 2-pixel black border, and 15 pixels of margin pushing other elements away.

## The Sizing Trap

Here's where beginners get tripped up. By default, the `width` property only sets the width of the **content**, not the whole box. Padding and border get added on top:

```
Total width = width + padding-left + padding-right + border-left + border-right
```

So a box with `width: 200px`, `padding: 20px`, and a `2px` border actually takes up `200 + 20 + 20 + 2 + 2 = 244` pixels of horizontal space. This surprises almost everyone the first time.

## The box-sizing Fix

The `box-sizing` property changes this behavior. Setting it to `border-box` makes `width` include padding and border, so the box stays exactly the size you specify:

```css
.box {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 2px solid black;
}
```

Now the total width stays at 200 pixels — padding and border are squeezed inside instead of added on top. This is so useful that most developers apply it globally at the start of every project:

```css
* {
  box-sizing: border-box;
}
```

The asterisk (`*`) is the **universal selector** — it matches every single element on the page.

## Shorthand for Sides

You can set padding or margin individually per side, or use shorthand to set all four at once:

```css
.box {
  margin-top: 10px;
  margin-right: 15px;
  margin-bottom: 10px;
  margin-left: 15px;

  /* same result, shorter: */
  margin: 10px 15px;
}
```

When you give two values, the first applies to top/bottom and the second to left/right. Four values go clockwise: top, right, bottom, left.

## What's Next

With the box model as your foundation, you're ready to arrange multiple boxes together. The next lesson introduces Flexbox, a powerful CSS tool for lining up elements in rows or columns without the guesswork.
