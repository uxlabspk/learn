---
title: Forms & Input Elements
description: Build HTML forms to collect user input with different input types and labels.
track: HTML Basics
order: 4
minutes: 8
---

## Why Forms Matter

Every time you log into a website, search for something, or sign up for a newsletter, you're using an HTML **form**. Forms are how a webpage collects information from a visitor and sends it somewhere — usually to a server for processing.

## The form Element

A form starts with the `<form>` tag, which wraps around all the input fields:

```html
<form action="/submit" method="post">
  <!-- inputs go here -->
</form>
```

The `action` attribute tells the browser where to send the data when the form is submitted. The `method` attribute tells it how to send that data — `post` is common for forms that create or change something, like a sign-up form.

## The input Element

Most form fields use the `<input>` tag, which is self-closing, like `<img>`. The `type` attribute controls what kind of input it is:

```html
<input type="text" name="username">
<input type="email" name="email">
<input type="password" name="password">
<input type="checkbox" name="subscribe">
<input type="submit" value="Sign Up">
```

Here are the most common types you'll use as a beginner:

- `text` — a single line of plain text
- `email` — like text, but the browser checks it looks like an email address
- `password` — hides the typed characters with dots
- `checkbox` — a small box the user can check or uncheck
- `submit` — a button that sends the form's data

The `name` attribute matters more than it might seem — it's the label used to identify each piece of data when the form is submitted. Without a `name`, the server has no way of knowing what that input's value represents.

## Labels: Don't Skip These

A `<label>` describes what an input field is for. Beginners often skip labels, but they matter a great deal for accessibility.

```html
<label for="email">Email Address:</label>
<input type="email" id="email" name="email">
```

Notice the `for` attribute on the label matches the `id` attribute on the input. This connection does two useful things: it lets screen readers announce the label when the input is focused, and it lets users click the label text itself to activate the input — helpful for small checkboxes on mobile devices.

## Textareas and Dropdowns

Not every input is a single line. For longer text, use `<textarea>`:

```html
<label for="message">Message:</label>
<textarea id="message" name="message" rows="4"></textarea>
```

For a dropdown menu of choices, use `<select>` with `<option>` elements inside:

```html
<label for="country">Country:</label>
<select id="country" name="country">
  <option value="us">United States</option>
  <option value="ca">Canada</option>
</select>
```

## Putting It Together

Here's a small, complete sign-up form:

```html
<form action="/signup" method="post">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name">

  <label for="email">Email:</label>
  <input type="email" id="email" name="email">

  <input type="submit" value="Sign Up">
</form>
```

When a visitor clicks "Sign Up," the browser gathers every named input's value and sends it to `/signup` using the `post` method.

## What's Next

You now understand how HTML collects data from visitors. In the next lesson, you'll learn about semantic HTML — tags like `<header>`, `<nav>`, and `<main>` that give your page structure real meaning, beyond just visual layout.
