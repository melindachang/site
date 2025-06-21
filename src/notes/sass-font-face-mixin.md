---
title: Easier @font-face Declarations in SASS
author: Melinda Chang
description: Snippets to make your life a little easier.
date: '2025.06.08'
tags:
  - Snippet
  - Web
published: true
---

This mixin relies on a string replace utility function I took from
[CSS
Tricks](https://css-tricks.com/snippets/sass/str-replace-function/),
modified for the latest Dart Sass specification. It looks like this:

```scss
@use 'sass:string';

@function str-replace($string, $search, $replace: '') {
  $index: string.index($string, $search);

  @if $index {
    @return string.slice($string, 1, $index - 1) + $replace +
      str-replace(
        string.slice($string, $index + string.length($search)),
        $search,
        $replace
      );
  }
}
```

I find SCSS slightly easier to read and maintain than the equivalent
indented syntax, so I'll use it here.

```scss
@use 'sass:map';
// snip
$font-weights: (
  400: 'Regular',
  500: 'Medium',
  600: 'Semibold',
  700: 'Bold',
);

@mixin font-face($name, $weight: 400, $style: regular) {
  $name-path: str-replace($name, ' ', '');
  $style-path: if($style == 'italic', 'Italic', '');

  $path: $name-path + '/' + $name-path + '-' + map.get($font-weights, $weight) +
    $style-path;

  @font-face {
    font-family: $name;
    src: url('/path/to/fonts/' + $path + '.woff2') format('woff2');
    src: url('/path/to/fonts/' + $path + '.woff') format('woff');
    font-weight: $weight;
    font-style: $style;
  }
}
```

My intent in the first place is to minimize the number of repetitive
parameters that I must input later when I declare specific fonts. As
such, I (kind of hackily) manipulate the font name into a valid path
according to some agreed-upon name scheme. If I import the font Commit
Mono, for instance, I would store in `/path/to/fonts/` a subdirectory
`CommitMono/` with each file named `CommitMono-WeightStyle.ext`. This
can be reconfigured. If, say, you would rather have a font folder
called `commit_mono/`, you can perform a bit of string manipulation,
like this:

```scss
@use 'sass:string';
// snip
$path: string.to-lower-case(str-replace($name, ' ', '_')) + '/' +
  str-replace($name, ' ', '') + map.get($font-weights, $weight) + $style-path;
// snip
```

We're all set up. Now I can import fonts by writing something like the
following:

```scss
@include font-face('Commit Mono'); // default args: ...400, regular
@include font-face('Commit Mono', 400, italic);
```

Or, if I have a font I need at every weight listed in `$font-weights`
in both regular and italic forms, I can use another SASS rule to
iterate through them:

```scss
@each $weight, $name in $font-weights {
  @include font-face('EB Garamond', $weight);
  @include font-face('EB Garamond', $weight, italic);
}
```
