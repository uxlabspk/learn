---
title: Text, Headings & Lists
description: Structure readable content using headings, paragraphs, and lists in HTML.
track: HTML Basics
order: 2
minutes: 6
---

## Organizing Text with Headings

Every webpage needs a way to show which text is a title, which is a subtitle, and which is just regular content. HTML gives us six levels of headings, from `<h1>` to `<h6>`.

```html
<h1>Main Page Title</h1>
<h2>A Major Section</h2>
<h3>A Smaller Subsection</h3>
```

`<h1>` is the biggest and most important — usually used once per page, for the main title. As the numbers increase, the headings get smaller and represent less important sections. Think of it like an outline in a document: `<h1>` is the title, `<h2>` are chapter headings, `<h3>` are subheadings within a chapter.

A common beginner mistake is choosing heading levels based on how big you want the text to look. Don't do this. Headings describe **structure**, not size. If you want text to look bigger without changing its meaning, that's a job for CSS, which you'll learn about soon.

## Paragraphs

Regular text content goes inside `<p>` tags, short for **paragraph**.

```html
<p>This is a paragraph. It can hold several sentences of text, and the browser will wrap the lines automatically to fit the screen.</p>
```

Browsers automatically add space above and below paragraphs, which helps separate blocks of text visually.

## Lists: Two Kinds

Lists are everywhere on the web — navigation menus, steps in a recipe, bullet points in an article. HTML has two types.

### Unordered Lists

An **unordered list** is a bulleted list, used when the order of items doesn't matter.

```html
<ul>
  <li>Milk</li>
  <li>Eggs</li>
  <li>Bread</li>
</ul>
```

`<ul>` stands for "unordered list," and it wraps around one or more `<li>` (list item) elements. Each `<li>` is one bullet point.

### Ordered Lists

An **ordered list** is numbered, used when sequence matters — like steps in instructions.

```html
<ol>
  <li>Preheat the oven</li>
  <li>Mix the ingredients</li>
  <li>Bake for 20 minutes</li>
</ol>
```

`<ol>` works exactly like `<ul>`, except the browser automatically numbers each `<li>` instead of adding a bullet.

## Nesting Elements

HTML elements can contain other elements — this is called **nesting**. For example, you can put a list inside a paragraph's section, or even a list inside another list item, to create a sub-list:

```html
<ul>
  <li>Fruits
    <ul>
      <li>Apple</li>
      <li>Banana</li>
    </ul>
  </li>
  <li>Vegetables</li>
</ul>
```

When nesting, always close tags in the reverse order you opened them — this keeps your structure valid and predictable for the browser.

## What's Next

You now know how to structure text so a browser (and a reader) can make sense of it. Next, you'll learn how to connect pages together and add images, using links and the `<a>` and `<img>` tags — two of the most important elements on the web.
