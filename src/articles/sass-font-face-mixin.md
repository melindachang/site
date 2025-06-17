---
title: Easier @font-face Declarations in SASS
author: Melinda Chang
description: Here's a snippet that I copy-paste everywhere.
date: '2025.06.08'
tags:
  - SASS
  - Web
published: true
---

CSS without a preprocessor is borderline unusable, but `@font-face` declarations are tedious even with. I usually end up pasting this snippet into every project.

This relies on a string replace utility function I took from [CSS Tricks](https://css-tricks.com/snippets/sass/str-replace-function/), which I modified for the latest Dart Sass specification. Here's what that looks like:

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

I would personally stick this in a different SASS file for general purpose utilities and import it with `@use` rules, but that isn't necessary if you don't intend to use it elsewhere.

I use SvelteKit for apps that would require this much boilerplate most of the time, so this will assume a SvelteKit-esque directory structure for imports. This is easy enough to modify yourself if your `fonts/` folder is located elsewhere. I also find SCSS slightly easier to read and maintain than the equivalent indented syntax, so I'll use it here.

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
		src: url('$lib/assets/fonts/' + $path + '.woff2') format('woff2');
		src: url('$lib/assets/fonts/' + $path + '.woff') format('woff');
		font-weight: $weight;
		font-style: $style;
	}
}
```

This makes the following assumptions:

- You use the following name scheme for fonts: If I'm using the font Commit Mono, for instance, I would store in `$lib/assets/fonts/` a subdirectory `CommitMono/` with each file named `CommitMono-WeightStyle.ext`. If, say, you would rather have a font folder called `commit_mono/`, you can perform a bit of string manipulation, like this:

  ```scss
  @use 'sass:string';
  // snip
  $path: string.to-lower-case(str-replace($name, ' ', '_')) + '/' +
  	str-replace($name, ' ', '') + map.get($font-weights, $weight) + $style-path;
  // snip
  ```

- You only want to load in webfonts (which you can generate on [Font Squirrel](https://www.fontsquirrel.com/tools/webfont-generator)). Change the file formats from WOFF/WOFF2 to TTF or OTF or whatever else, if you'd like.
- You're making use only of the weights in the map `$font-weights`. If you need a Black option, for instance, you could add the entry `'Black': 900`.

Now, for a font with a regular weight in regular and italic styles, I can write the following:

```scss
@include font-face('Commit Mono');
@include font-face('Commit Mono', 400, italic);
```

Or, if I have a font I need at every weight listed in `$font-weights` in both regular and italic forms, I can use another SASS rule:

```scss
@each $weight, $name in $font-weights {
	@include font-face('EB Garamond', $weight);
	@include font-face('EB Garamond', $weight, italic);
}
```
