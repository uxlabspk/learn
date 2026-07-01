---
title: Handling Forms in React
description: Build controlled inputs in React and manage form state with onChange and onSubmit.
track: React Basics
order: 3
minutes: 7
---

## Forms Work Differently in React

In plain HTML, an `<input>` manages its own value internally, and the browser tracks what's typed. In React, the recommended approach is different: React itself tracks the value, using state. This is called a **controlled input**, because React is fully in control of what the input displays.

## A Basic Controlled Input

```jsx
import { useState } from "react";

function NameForm() {
  const [name, setName] = useState("");

  return (
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
```

Here's how this works, piece by piece. The `value` attribute is set to the `name` state — this means the input's displayed text always matches whatever is in state, not whatever the browser thinks was typed. The `onChange` handler fires every time the user types a character, and updates state to match.

`e` here is the **event object**, automatically passed to the handler, and `e.target.value` is the current text inside the input at that moment. This pattern — read `e.target.value`, pass it to the setter — is something you'll type constantly in React.

## Why "Controlled"?

Because the input's value comes entirely from state, React is the single source of truth. This might feel like extra work for a simple text box, but it becomes powerful once you need to validate input, format it as the user types, or coordinate multiple fields together.

## Handling Multiple Fields

For a form with several fields, it's common to store them together in one object, rather than a separate `useState` call for each:

```jsx
function SignupForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  return (
    <form>
      <input name="email" value={formData.email} onChange={handleChange} />
      <input name="password" type="password" value={formData.password} onChange={handleChange} />
    </form>
  );
}
```

Two things are worth noticing here. First, `...formData` (the spread operator from an earlier lesson) copies the existing fields before updating just one. Second, `[e.target.name]` uses bracket notation with a variable key — the `name` attribute on each input tells `handleChange` *which* field to update, so one function can handle every input in the form.

## Handling Submission

The `onSubmit` event fires when a form is submitted — typically by pressing Enter or clicking a submit button.

```jsx
function handleSubmit(e) {
  e.preventDefault();
  console.log("Submitting:", formData);
}

return (
  <form onSubmit={handleSubmit}>
    {/* inputs here */}
    <button type="submit">Sign Up</button>
  </form>
);
```

`e.preventDefault()` is essential here. By default, submitting an HTML form reloads the entire page — which would erase all of your React state and defeat the purpose of a single-page application. Calling `preventDefault()` stops that default browser behavior, letting your JavaScript handle the submission instead.

## What's Next

You can now build interactive forms with full control over their data. So far, every example has lived on a single page. The next lesson introduces React Router, which lets a React application show different content depending on the URL — the foundation of multi-page apps.
