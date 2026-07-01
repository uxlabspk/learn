---
title: Links, Images & Paths
description: Connect pages with anchor tags and embed images using correct file paths.
track: HTML Basics
order: 3
minutes: 7
---

## Linking Pages Together

The web is called a "web" because pages link to each other. In HTML, you create a link using the anchor tag, `<a>`.

```html
<a href="https://example.com">Visit Example</a>
```

The `href` attribute (short for **hypertext reference**) tells the browser where the link should go. The text between the opening and closing tags — "Visit Example" here — is what the visitor actually sees and clicks.

An **attribute** is extra information added inside an opening tag, always written as `name="value"`. You'll see attributes on almost every kind of HTML element.

## Relative vs Absolute Paths

When linking to your own pages (not another website), you need to understand **paths** — the address describing where a file lives.

An **absolute path** includes the full web address, starting with `https://`:

```html
<a href="https://mysite.com/about.html">About</a>
```

A **relative path** describes the location of a file compared to the current page, without the full address:

```html
<a href="about.html">About</a>
<a href="pages/contact.html">Contact</a>
<a href="../index.html">Home</a>
```

Here, `about.html` means "look for this file in the same folder as the current page." `pages/contact.html` means "go into the pages folder, then find contact.html." The two dots, `../`, mean "go up one folder level."

Relative paths are usually preferred for links within your own site, because they keep working even if you move your whole project to a different domain.

## Adding Images

Images use the `<img>` tag. Unlike most tags, `<img>` is self-closing — it doesn't wrap around content, so there's no separate closing tag.

```html
<img src="images/sunset.jpg" alt="Orange sunset over the ocean">
```

The `src` attribute (short for **source**) points to the image file, using the same relative or absolute path rules as links.

## Why alt Text Matters

The `alt` attribute provides a text description of the image. This is not optional decoration — it serves two important purposes.

First, **screen readers** — software used by visually impaired users to navigate the web — read the alt text aloud instead of the image. Without it, the image is invisible to them.

Second, if the image fails to load (a broken link, a slow connection), the browser shows the alt text in its place. Search engines also use alt text to understand what an image shows, which affects how your page ranks in search results.

Good alt text is short and descriptive:

```html
<img src="dog.jpg" alt="A golden retriever playing fetch in a park">
```

If an image is purely decorative and adds no information, you can use an empty alt attribute (`alt=""`) so screen readers skip over it.

## Combining Links and Images

You can wrap an image inside a link to make the whole image clickable:

```html
<a href="https://example.com">
  <img src="logo.png" alt="Company logo">
</a>
```

## What's Next

You can now connect pages and embed images with proper paths. Next up: forms — how HTML captures information from visitors, like search boxes, sign-up fields, and buttons.
