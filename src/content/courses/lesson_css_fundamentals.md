---
title: CSS Fundamentals
description: Learn how to style your HTML content with Cascading Style Sheets.
track: beginner
order: 2
minutes: 10
---

# CSS Fundamentals

Now that you know how to structure content with HTML, it's time to make it look great! CSS (Cascading Style Sheets) is the language used to style your HTML. It controls the colors, fonts, layout, and overall appearance of your webpage.

## CSS Syntax & Selectors

CSS works by applying styles to HTML elements. A basic CSS rule has two parts: a **selector** and a **declaration block**.

The rule syntax looks like this:
`selector { property: value; }`

The **selector** targets which HTML element you want to style. You can select elements using three main ways:

1.  **Element Selectors:** Target all instances of a specific HTML tag (e.g., `p { ... }` styles all paragraphs).
2.  **Class Selectors:** Target elements that have a specific `class` attribute (e.g., `.highlight { ... }`). Classes are reusable for many elements.
3.  **ID Selectors:** Target a single, unique element using its `id` attribute (e.g., `#main-header { ... }`). IDs should be used sparingly for unique elements.

To style a class, you use a dot (`.`) before the class name.

```css
/* Styling all paragraph elements */
p {
  color: blue;
}

/* Styling any element with the class "highlight" */
.highlight {
  background-color: yellow;
}

/* Styling a single element with the ID "main-header" */
#main-header {
  border-bottom: 2px solid black;
}
```

## The Box Model

Every single HTML element is treated by CSS as a rectangular box. Understanding the Box Model is crucial for controlling spacing and size. It consists of four layers, from the inside out:

1.  **Content:** The actual text, image, or other content inside the element.
2.  **Padding:** The space between the content and the border. This space is *inside* the border.
3.  **Border:** The line that goes around the padding and content.
4.  **Margin:** The space *outside* the border, separating this element from other elements.

A key concept is `box-sizing: border-box;`. By setting this, you tell the browser that the width and height you set for an element will include the padding and border, making layout much more predictable.

```css
.box {
  width: 200px;
  height: 100px;
  padding: 15px;
  border: 5px solid purple;
  box-sizing: border-box; /* This makes the width/height include padding and border */
}
```

## Flexbox Layout

Flexbox is a one-dimensional layout system, meaning it's great for arranging items in a single row or a single column. It is perfect for aligning items within a container.

You enable Flexbox by setting the `display` property to `flex` on the parent container.

Key properties on the parent container:

*   `display: flex;`: Turns the container into a flexible container.
*   `justify-content`: Controls alignment along the main axis (horizontally by default).
*   `align-items`: Controls alignment along the cross axis (vertically by default).
*   `flex-direction`: Defines the direction of the main axis (row or column).

```css
.container {
  display: flex;
  justify-content: space-around; /* Distributes space between items */
  align-items: center; /* Vertically centers items */
}
```

## CSS Grid Layout

CSS Grid is a two-dimensional layout system, allowing you to create complex layouts with both rows and columns simultaneously.

You enable Grid by setting `display: grid;` on the parent. You define the structure using properties like `grid-template-columns` or `grid-template-rows`.

```css
.grid-container {
  display: grid;
  /* Defines three equal columns */
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px; /* Adds space between grid items */
}
```

## Responsive Design & Media Queries

Websites must look good on phones, tablets, and desktops. Responsive Design ensures this.

1.  **Viewport Meta Tag:** You *must* include this in your HTML `<head>` for mobile devices to render correctly:
    ```html
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ```
2.  **Media Queries:** These are CSS rules that apply styles only when certain conditions are met, usually based on screen width. This is known as a "mobile-first" approach (designing for mobile first, then adding styles for larger screens).

```css
/* Default styles for mobile */
.container {
  flex-direction: column; /* Stack items vertically on small screens */
}

/* Styles applied only when the screen is wider than 768px */
@media (min-width: 768px) {
  .container {
    flex-direction: row; /* Switch to a horizontal layout on larger screens */
  }
}
```

## Colors, Typography & Spacing Systems

Finally, let's talk about the details:

*   **Colors:** You can use various formats like Hex codes (`#FF0000`), RGB (`rgb(255, 0, 0)`), or HSL.
*   **Typography:** Use the `font-family` property, often listing several fallback fonts to ensure your text looks good everywhere.
*   **Spacing:** To maintain consistency, define a spacing scale (e.g., using multiples of 8 pixels) for your padding and margins.

```css
body {
  font-family: 'Arial', sans-serif;
  color: #333;
}

.card {
  padding: 20px;
  margin-bottom: 15px;
  background-color: #f4f4f4;
}
```

---

You have now covered the core concepts of CSS! You know how to select elements, control spacing with the Box Model, and start building complex layouts with Flexbox and Grid. In our next lesson, we will explore how to make your website truly responsive using Media Queries to adapt beautifully to any screen size.