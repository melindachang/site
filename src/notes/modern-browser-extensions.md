---
title: Programmatic and Preprocessed Style Injection Workflow with WXT
author: Melinda Chang
date: 2025.06.25
description: On achieving (slightly more) ergonomic browser extension development.
tags:
  - Web
  - Extensions
published: true
---

I regularly develop Chromium- and Firefox-compatible browser
extensions for personal use. Of those, the majority are aesthetic or
quality-of-life enhancements for specific websites that at once
require extensive DOM manipulation and stylesheet injections. It is
entirely possible to accomplish this with a combination of userscript
and stylesheet managers (I favor
[Violentmonkey](https://violentmonkey.github.io/) and
[Stylus](https://github.com/openstyles/stylus)), but any one site
might require a suite of many interdependent scripts and themes to be
installed and configured separately. This is an exceedingly tenuous
workflow to begin with, and it is also not one that I have any desire
to maintain in the event that I package and distribute any of these
solutions.

Extensions are pretty much the only unified interface with which we
can manipulate web pages that aren't ours. JavaScript, as demonic and
haphazardly designed as it is, by now offers a handful of
interoperable tools that make it trivially easy to develop and deploy
several kinds of software, e.g., SPAs. I am reminded whenever I
undertake one of these projects that browser extensions do not number
among them.

I've tried for a while now to nail down a stack and workflow to
implement the base functionality I want (that is, programmatic
stylesheet injections). For my sanity, it must support the following:

1. _Firefox, in addition to Chrome._ I don't use Chromium-based
   browsers anymore, but supporting the former generally entails
   supporting the latter. While I've used
   [CRXJS](https://crxjs.dev/vite-plugin) before to implement
   something like this, it relies on Chrome's API for hot reload and
   is therefore out of the running.
2. _TypeScript and CSS pre-processing._ I use SCSS. I have not
   written vanilla JavaScript or CSS since middle school and I do not
   intend to start now.
3. _Hot module reload._ Extension development without it is even more
   hell on Earth than is typical. Specifically, the injections need to
   be watched as part of the dependency graph, but they should be
   included in the manifest as a web-accessible resource and not a
   content script.

No tool presently offers a pipeline for (3) out of the box. After
trying something like ten different build tools and wrangling together
my own with Bun, I can say definitively that [WXT](https://wxt.dev/)
is the most comprehensive offering available. It is also in
pre-release and has the bugs to show for it. We're sticking with it
until someone can convince me that there is a real reason to use Bun
over Vite.

If you don't feel like following along, here are the links to the
template repositories on Codeberg and GitHub.

## Getting started with WXT

We can bootstrap the project relatively easily, because it doesn't
matter which frontend framework you use for this task.

```shellscript
bunx wxt@latest init
```

I'm using Svelte and Bun in this example. We should see that this
bootstrapped project assumes a layout that approximates this one:

```
├── package.json
├── public/
├── README.md
├── src/
│   ├── assets/
│   ├── entrypoints/
│   │   ├── background.ts
│   │   ├── content.ts
│   │   └── popup/
│   └── lib/
├── tsconfig.json
├── wxt.config.ts
└── wxt-env.d.ts
```

Let's set up a basic stylesheet. It can contain any rule for testing
purposes, but as we should be able to leverage all typical SASS
features, I'll create a file that imports a partial with the `@use`
rule:

```scss
// src/assets/injection.scss

@use 'styles/_variables';

body {
  background: variables.$color;
}
```

Then, we can create the corresponding definition at this path that we
specified:

```scss
// src/assets/styles/_variables.scss

$color: blue;
```

There are a few reasons why I opt to place our styles in the
`src/assets/` directory. The idiomatic way to include unlisted CSS
files in the final build is within `src/entrypoints/`, but we're
actually working around a bug in WXT where only `.css` files (as
opposed to `.sass`, `.scss`, etc.) are detected and included in the
bundle. [This issue](https://github.com/wxt-dev/wxt/issues/1580) is
open as of June 2025. I also cannot find a way to watch said files for
changes during development without importing them into another script,
which produces an extra CSS file in the build directory.

## Writing injection logic

I'll assume for our basic implementation that we do not need to store
long-term state, so we can keep our code in the content script as
opposed to the background script.

The default content script in your starter should look something like
this:

```ts
// src/entrypoints/content.ts

export default defineContentScript({
  matches: ['*://*.google.com/*'],
  main() {
    console.log('Hello content.')
  },
})
```

You can reference more of the options that `defineContentScript()`
accepts
[here](https://wxt.dev/api/reference/wxt/type-aliases/ContentScriptDefinition.html#type-alias-contentscriptdefinition). Our
injection goes in the `main()` function, which will run when our
route's domain matches `google.com`. Let's define a function that
creates a DOM node that links to our style resource.

```ts
// src/entrypoints/content.ts

const inject_style_and_repaint = (): void => {
  const href = browser.runtime.getURL('content-scripts/content.css')

  const prev = document.querySelector('link[data-extension-style]')
  if (prev) prev.remove()

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  link.dataset.extensionStyle = href

  const parent = document.head ?? document.documentElement
  parent.appendChild(link)
}

export default defineContentScript({
  // ...
})
```

A quick walkthrough:

- We use the cross-platform `browser` API in order to access the URL
  of a web-accessible resource. You may notice that the path we define
  here is not to an `assets/injection.css` file&mdash;this is a side
  effect that I will explain later.
- As this script may re-run during either development or production
  without a page reload, we remove any existing `link` node associated
  with our extension that may already exist in the document.
- We create a `<link>` element that points to the URL we acquire at
  runtime. Specifying `link.dataset.extensionStyle` outputs a link
  with a non-null property `data-extension-style`, which is useful for
  the previous instruction.
- We append this element to `<head>` if it exists, and `<html>` if
  not.

Next, we write our logic in the `main()` function, which will simply
call the function `inject_style_and_repaint()` on document load.

```ts
// src/entrypoints/content.ts

//...
export default defineContentScript({
  matches: ['*://*.google.com/*'],
  main() {
    if (
      document.head ||
      document.readyState === 'complete' ||
      document.readyState === 'interactive'
    ) {
      inject_style_and_repaint()
    } else {
      window.addEventListener('DOMContentLoaded', inject_style_and_repaint, {
        once: true,
      })
    }
  },
})
```

## Bundle configuration

We want to include our stylesheet in the dependency graph&mdash;as an
asset, it will be excluded from the bundle otherwise. We'll import it
here:

```ts
// src/entrypoints/content.ts

import '../assets/injection.scss'
```

WXT is based off of Vite, so we don't need to include any additional
configuration in order for our stylesheet to be pre-processed. Just
make sure to install your preprocessor:

```shellscript
bun add -D sass-embedded
```

When we run Vite either to build for production or to start the
development environment, WXT treats any stylesheet imported by
`content.ts` as a content script in and of itself. This also means
that the sheet is renamed to `content-scripts/content.css` in the
output bundle, hence the URL we passed in from earlier. We don't want
all of this behavior, because the entire purpose of programmatic
injection is to surgically manipulate and refresh styles during
runtime. This we can correct by passing in an additional option to
`defineContentScript()`:

```ts
// src/entrypoints/content.ts

// ...
export default defineContentScript({
  matches: ['*://*.google.com/*'],
  cssInjectionMode: 'manual', // 'manifest' | 'ui'
  main() {
    // ...
  },
})
```

You can read more about this option in the [WXT
docs](https://wxt.dev/api/reference/wxt/interfaces/MainWorldContentScriptDefinition.html#cssinjectionmode).

WXT generates our manifest at build time according to the target
(Chrome or Firefox) that we specify, but we want to explicitly
hard-code our stylesheet as a web-accessible resource so that we can
retrieve it via `browser.runtime.getURL()`. We can define these
options in the WXT config at the base of our project directory.

By default, it will look something like this:

```ts
// wxt.config.ts
import { defineConfig } from 'wxt'

export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-svelte'],
})
```

We can pass an object into a `manifest` option that contains the
information we want. By default, this will assume the structure of a
typical Manifest V3 document:

```ts
// wxt.config.ts
import { defineConfig } from 'wxt'

export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-svelte'],
  manifest: {
    web_accessible_resources: [
      {
        matches: ['*://*.google.com/*'],
        resources: ['content-scripts/content.css'],
      },
    ],
  },
})
```

If we build for a Firefox target, which supports manifest V2, WXT will
make the conversion automatically.

## Enabling hot repaint

We're ready to test out our program. This should be functional on
either Chrome or Firefox, but I'll use the latter to demonstrate. Run
the development server:

```shellscript
bun run dev:firefox
```

This should open a browser window with all user settings erased and
the extension installed. We've set this project up so that the content
script and stylesheet resource only match the `google.com` domain, so
let's navigate there.

If all goes well, you should see that the background of the search
engine has changed to the color we specified&mdash;in my case,
blue&mdash;in `src/assets/styles/_variables.scss`. You can open up
DevTools to find the `<link>` element and take a look at the compiled
stylesheet.

Try making an edit to your raw stylesheet, though, and you may notice
some peculiar behavior. I'll declare the variable as something else:

```scss
// src/assets/styles/_variables.scss

$color: red;
```

If we look back at our browser window, we should see in DevTools that
the style resource has hot-reloaded accordingly; it will show up
correctly if you navigate again to the URL in `<link>`. But the
changes do not show up on the screen unless we manually tick the box
next to our applied style with Inspect Element, and our changes
disappear even then upon a refresh.

This is because the new `<link>` element that we've created points to
the same URL as the one we delete with `node.remove()` each time the
content script re-runs. Firefox caches this asset and does not re-read
its contents.

As a solution, we can add a unique tag to the end of each URL we
generate that forces the hot reload. Return to your content script and
make the following modification:

```ts
// src/entrypoints/content.ts

const inject_style_and_repaint = (): void => {
  const href = browser.runtime.getURL('content-scripts/content.css') // [!code --]
  const href = // [!code ++]
    browser.runtime.getURL('content-scripts/content.css') + `?t=${Date.now()}` // [!code ++]
  // ...
}
```

We never read this option ourselves, but Firefox registers it as a URL
that differs from the one stored in cache and will trigger the
repaint. Your complete content script file should look like this:

```ts
// src/entrypoints/content.ts
import '../assets/injection.scss'

const inject_style_and_repaint = (): void => {
  const href =
    browser.runtime.getURL('content-scripts/content.css') + `?t=${Date.now()}`

  const prev = document.querySelector('link[data-extension-style]')
  if (prev) prev.remove()

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  link.dataset.extensionStyle = href

  const parent = document.head ?? document.documentElement
  parent.appendChild(link)
}

export default defineContentScript({
  matches: ['*://*.google.com/*'],
  cssInjectionMode: 'manual',
  main() {
    if (
      document.head ||
      document.readyState === 'complete' ||
      document.readyState === 'interactive'
    ) {
      inject_style_and_repaint()
    } else {
      window.addEventListener('DOMContentLoaded', inject_style_and_repaint, {
        once: true,
      })
    }
  },
})
```

Now try hot reloading the styles again. It should function perfectly.

## Enhancements

_Coming soon._
