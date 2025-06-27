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
my own with Bun, I begrudgingly accept that [WXT](https://wxt.dev/) is
the most comprehensive offering available. It is also in pre-release
and has all of the bugs to show for it.

I have made template repositories for myself on
[Codeberg](https://codeberg.org/melindachang/wxt-injection-starter)
and [GitHub](https://github.com/melindachang/wxt-injection-starter),
but this implementation and WXT are both so unstable that I do not
think anyone should use them in their current state besides me.

## Getting started with WXT

We can bootstrap the project relatively easily, because frontend
frameworks do not matter for this task. I use Svelte and Bun.

```shellscript
bunx wxt@latest init
```

The base stylesheet we attempt to inject can contain any rule for
testing purposes, but as we should be able to leverage all typical
SASS features, I'll create a file that imports a partial with the
`@use` rule:

```scss
// src/entrypoints/injection.scss

@use '../lib/styles/_variables';

body {
  background: variables.$color;
}
```

Then, we can create the corresponding definition at this path that we
specified:

```scss
// src/lib/styles/_variables.scss

$color: blue;
```

WXT is supposed to treat a certain subset of files in
`src/entrypoints`, including stylesheets of any kind, as items to be
processed and included in the final build. As of June 2025, this is
broken for all stylesheets that do not have a `.css`
extension. [Here's the
issue](https://github.com/wxt-dev/wxt/issues/1580). And [here's the
patch](https://codeberg.org/melindachang/wxt-injection-starter/src/branch/main/patches/wxt@0.20.7.patch).

## Writing injection logic

By default, the content script looks something like this:

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
[here](https://wxt.dev/api/reference/wxt/type-aliases/ContentScriptDefinition.html#type-alias-contentscriptdefinition). The
injection goes in the `main()` function, which will run when our
route's domain matches `google.com`. Let's define a function that
creates a DOM node that links to our style resource.

```ts
// src/entrypoints/content.ts

const inject_style_and_repaint = (): void => {
  const href = browser.runtime.getURL('assets/injection.css')

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

WXT is based off of Vite, so we don't need to include any additional
configuration in order for our stylesheet to be pre-processed:

```shellscript
bun add -D sass-embedded
```

WXT generates our manifest at build time according to the target
(Chrome or Firefox) that we specify, but we want to explicitly
hard-code our stylesheet as a web-accessible resource so that we can
retrieve it via `browser.runtime.getURL()`. We can define these
options in the WXT config at the base of our project directory:

```ts
// wxt.config.ts
import { defineConfig } from 'wxt'

export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-svelte'],
  manifest: {
    web_accessible_resources: [
      { matches: ['*://*.google.com/*'], resources: ['assets/injection.css'] },
    ],
  },
})
```

If we build for a Firefox target, which supports manifest V2, WXT will
make the conversion automatically.

## Enabling hot repaint

The basic injection functionality will work without any further
intervention. I can run the development server with my preferred
browser target:

```shellscript
bun run dev:firefox
```

After navigating to a URL under the matching domain (that is,
`google.com`) search engine has changed to the color we
specified&mdash;in my case, blue&mdash;in
`src/assets/styles/_variables.scss`.

By default, neither the unlisted styles included in the bundle via
`src/entrypoints` nor the SASS dependencies they `@use` or `@forward`
are included in the dependency graph. WXT exposes a somewhat limited
API that allows us to rectify this behavior at build time via modules.

Any script we include in the `modules/` folder WXT will automatically
try to include. Let's make it:

```ts
// modules/scss-deps-hmr.ts

import { defineWxtModule } from 'wxt/modules'
import path from 'path'
import fs from 'fs'

export default defineWxtModule({
  setup(wxt) {
    wxt.hook('server:started', (wxt, server) => {
      const injection = path.resolve(
        wxt.config.root,
        'src/entrypoints/injection.scss',
      )
      const themes_dir = path.resolve(wxt.config.root, 'src/lib/themes')
      server.watcher.add(themes_dir)
      server.watcher.on('change', async file => {
        if (file.endsWith('.scss')) {
          console.log(
            '[scss-hmr] Invalidating module: ',
            path.relative(wxt.config.root, injection),
          )

          await wxt.builder.build({
            type: 'unlisted-style',
            name: 'injection',
            options: {},
            inputPath: injection,
            outputDir: path.resolve(wxt.config.outDir, 'assets'),
          })

          server.reloadExtension()
        }
      })
    })
  },
})
```

A quick walkthrough of what this accomplishes:

- WXT exposes a number of build events that we can hook into to
  perform modifications; in our case, we wait for the development
  server to initialize.
- WXT uses Vite uses the Chokidar file watcher under the hood. Our
  base injection file is included in the watchlist by virtue of being
  in `src/entrypoints`, but not the modules it imports. I've
  inelegantly hard-coded a directory in which all of them live that
  the watcher will search, because I doubt it's possible to step
  through specific chains of dependency between SASS files without
  writing a Vite plugin.
- We add an event listener that invalidates `injection.scss` if any
  watched `.scss` file is written to. As we need preprocessors to
  fire, this means sending it through the WXT builder. We need,
  finally, to reload the entire extension (not a terribly expensive
  operation) to get the content script to run again without a refresh.

HMR for our unlisted stylesheet is now functional. Try making an edit
to it, though, and you may notice some peculiar behavior. I'll declare
the variable as something else:

```scss
// src/lib/styles/_variables.scss

$color: red;
```

We should see in DevTools that the style resource has hot-reloaded
accordingly; it will show up correctly if you navigate again to the
URL in `<link>`. But the changes do not show up on the screen unless
we manually tick the box next to our applied style with Inspect
Element, and our changes disappear even then upon a refresh.

This is because the new `<link>` element that we've created points to
the same URL as the one we delete with `node.remove()` each time the
extension reloads. Firefox caches this asset and does not re-read
its contents.

As a solution, we can add a unique tag to the end of each URL that
forces the hot reload during development:

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
repaint. This leaves us with a complete content script that looks like
this:

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

And we're done.

## Enhancements

_Coming soon._
