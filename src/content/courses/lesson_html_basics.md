---
title: HTML Basics for Beginners
description: Learn the fundamental structure and elements of an HTML webpage.
track: beginner
order: 1
minutes: 8
---

# HTML Basics for Beginners

Welcome to the world of web development! HTML (HyperText Markup Language) is the backbone of every webpage you see. It tells the browser how to structure and display your content. This lesson will introduce you to the core concepts of HTML.

## The Anatomy of an HTML Page

Every HTML document starts with a basic structure. This structure tells the browser exactly what kind of document it is and how to read the rest of the code.

The very first line is the **DOCTYPE declaration**. This is not an HTML tag; it's an instruction to the browser. It tells the browser which version of HTML you are writing (currently, it is usually HTML5).

```html
<!DOCTYPE html>
```

After the declaration comes the root element, `<html>`. Everything else goes inside `<html>`. Inside `<html>`, we have two main sections: the `<head>` and the `<body>`.

The `<head>` section contains important information about the page, like the title that appears in the browser tab, character sets, and links to stylesheets. The `<body>` section contains all the visible content—the text, images, links, and everything the user actually sees.

## Text, Headings & Lists

The `<body>` is where you put your content. HTML provides many ways to structure text.

### Headings and Paragraphs

Headings are used to organize your content in a hierarchy. You use `<h1>` for the most important main title, and then `<h2>`, `<h3>`, and so on, down to `<h6>`. You should only use one `<h1>` per page. Paragraphs are used for regular blocks of text using the `<p>` tag.

```html
<h1>Main Page Title</h1>
<p>This is the first paragraph of text on my page.</p>
<h2>A Subsection</h2>
<p>This is a paragraph under the subsection.</p>
```

### Lists

You can present information in lists to make it easier to read. There are two main types of lists:

1.  **Unordered Lists (`<ul>`):** Used when the order of items doesn't matter. Each item is marked with a bullet point.
2.  **Ordered Lists (`<ol>`):** Used when the order is important, like steps in a recipe. Each item is numbered automatically.

```html
<h2>My Favorite Fruits</h2>
<h3>Unordered List</h3>
<ul>
  <li>Apple</li>
  <li>Banana</li>
  <li>Cherry</li>
</ul>

<h3>Ordered List</h3>
<ol>
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>
```

## Links, Images & Paths

To make your webpage interactive, you need links and images.

### Links

The anchor tag, `<a>`, creates a hyperlink. It needs an attribute called `href` (Hypertext Reference) to tell the browser where to go.

```html
<a href="about.html">Go to the About Page</a>
```

You can link to other pages on your site or external websites.

### Images

The `<img` tag is used to embed an image into your HTML document. It is a self-closing tag, meaning it doesn't need a closing tag like `</img>`. You must include the `src` (source) attribute to point to the image file and the `alt` (alternative text) attribute. Alt text is very important because it describes the image for visually impaired users and is also read by screen readers.

```html
<img src="images/my_picture.jpg" alt="A beautiful sunset over the ocean">
```

## Forms & Input Elements

Forms allow users to submit information to your website, such as login details or feedback. The `<form>` tag wraps all the input elements.

The `<input>` tag is used to create different types of fields. The `type` attribute changes what the input looks like (text box, password field, checkbox, radio button, etc.).

```html
<form action="/submit-data" method="post">
  <label for="username">Username:</label>
  <input type="text" id="username" name="user_name">
  <input type="submit" value="Submit">
</form>
```

## Semantic HTML & Accessibility Basics

As you build more complex pages, you need to think about meaning, not just appearance. This is called Semantic HTML.

Semantic tags tell the browser and search engines what the content *is*. For example, using `<header>` for the top section of the page, `<nav>` for navigation links, `<main>` for the main content, and `<footer>` for the bottom section.

Using these tags makes your code much easier for other developers to read and helps search engines understand the structure of your page. Crucially, these tags also improve **accessibility** because screen readers (software used by visually impaired users) use these semantic tags to navigate the page logically.

---

Now that you understand the basic building blocks of HTML, you are ready to start putting these elements together. In the next lesson, we will dive into CSS, which is the language used to style your HTML and make your pages look beautiful!