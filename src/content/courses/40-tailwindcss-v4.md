---
title: Utility-First CSS with Tailwind v4
description: Style HTML directly with Tailwind v4's utility classes and CSS-native theme configuration.
track: CSS Fundamentals
order: 7
minutes: 8
---

## A Different Way to Write CSS

Every CSS lesson so far has followed the same pattern: write a selector in a `.css` file, then list properties inside it. **Tailwind CSS** flips this around. Instead of writing custom CSS rules, you style elements by applying small, pre-built **utility classes** directly in your HTML — each one doing exactly one job.

```html
<button class="bg-blue-500 text-white px-4 py-2 rounded">
  Click me
</button>
```

Here, `bg-blue-500` sets a background color, `text-white` sets text color, `px-4 py-2` sets padding, and `rounded` adds rounded corners. No separate CSS file, no custom class name to invent — you build up a design by combining small, single-purpose classes right where you're already working.

## Setting Up Tailwind v4

Tailwind v4 simplified installation considerably compared to earlier versions. In a project using a bundler like Vite, you install one package and add a single import line to your CSS file:

```css
@import "tailwindcss";
```

That's the entire setup. Earlier versions required three separate `@tailwind` directives (`base`, `components`, `utilities`) and a JavaScript configuration file — v4 replaced both with this one line, plus automatic detection of which HTML and JavaScript files use Tailwind classes, so unused styles are automatically excluded from your final CSS.

## Reading Utility Class Names

Most Tailwind classes follow a predictable pattern: `property-value`. Once you learn the pattern, you can often guess a class name correctly before ever checking the documentation.

```html
<div class="flex justify-between items-center p-6 m-4 text-lg">
  <p>Left content</p>
  <p>Right content</p>
</div>
```

Compare this to the Flexbox lesson from earlier in this track — `flex`, `justify-between`, and `items-center` map directly onto `display: flex`, `justify-content: space-between`, and `align-items: center`. Tailwind isn't a new layout system; it's a shorthand vocabulary for the CSS you already know.

## Responsive Design with Prefixes

Recall the media queries lesson, where you wrote `@media (min-width: 768px) { ... }` to adjust styles at different screen sizes. Tailwind handles this with a **breakpoint prefix** added before a utility class:

```html
<div class="text-sm md:text-lg lg:text-2xl">
  This text grows on larger screens
</div>
```

This follows the same mobile-first philosophy from the responsive design lesson: `text-sm` applies by default (mobile), and `md:text-lg` overrides it only once the screen reaches Tailwind's `md` breakpoint (768px) or wider, with `lg:text-2xl` overriding again at an even larger size.

## The theme Directive: CSS-Native Configuration

Tailwind v4's biggest architectural change is how you customize it. Earlier versions used a separate `tailwind.config.js` JavaScript file. In v4, configuration moves directly into your CSS, using the `@theme` directive:

```css
@import "tailwindcss";

@theme {
  --color-brand: #6366f1;
  --font-sans: "Inter", sans-serif;
  --spacing-18: 4.5rem;
}
```

Every variable defined inside `@theme` automatically becomes both a real CSS custom property (usable anywhere with `var(--color-brand)`) and a matching set of utility classes. Defining `--color-brand` here instantly makes `bg-brand`, `text-brand`, and `border-brand` available to use in your HTML — no separate step required.

## A Complete Example

```html
<div class="max-w-sm mx-auto rounded-lg shadow-md p-6 bg-white">
  <h2 class="text-xl font-bold text-gray-800">Welcome</h2>
  <p class="mt-2 text-gray-600">
    This card is styled entirely with utility classes.
  </p>
  <button class="mt-4 bg-brand text-white px-4 py-2 rounded hover:opacity-90">
    Get Started
  </button>
</div>
```

Notice `hover:opacity-90` — the colon prefix works the same way as the responsive breakpoints above, applying a utility only under a specific condition, in this case, on mouse hover.

## Why Use Utility Classes at All?

Beginners often ask why this is preferable to writing plain CSS. The main benefits are speed (no switching between HTML and CSS files or inventing class names) and consistency (since utilities are pulled from one shared, predefined scale for spacing, color, and size, rather than each developer picking arbitrary values). The tradeoff is that your HTML becomes more crowded with classes — a style choice, not a right-or-wrong answer, and one worth trying for yourself.

## What's Next

You now understand how Tailwind maps directly onto the CSS concepts you've already learned — box model spacing, Flexbox alignment, media query breakpoints — through a compact class-based syntax. From here, the best way to build fluency is practice: take one of your earlier CSS exercises and try rebuilding it using only Tailwind utility classes.
