---
title: State of the Union Except the Union is my Emacs Setup
author: Melinda Chang
description:
  I present a document containing every disorganized thought about my computer and the things on it
  that I have had over the last two weeks!
date: '2025.05.20'
tags:
  - Emacs
  - Linux
published: false
---

## Viable Emacs builds on Windows and other figments of the imagination

Performance isn't terrible, especially running vanilla Emacs on WSL2 and through an X server like
VcXsvr. I don't know that I would characterize startup times or overall performance as near-native,
but it is a far cry from the freakshow that is the official Windows binary.

## On org-mode alternatives

I admitteldy prefer the ergonomics and logic of Vim keybindings to those of Emacs&mdash;while there
is robust infrastructure available for Emacs to emulate Vim's better features (namely, the Evil
package included in Doom, Spacemacs, and other major distributions), these interpreted compatibility
layers bring inevitable performance overhead. Neovim has its share of org-mode ports and
derivatives, the most popular being [Neorg](https://github.com/nvim-neorg/neorg) and `orgmode.nvim`.
The latter is a mature project that falls somewhat short of feature parity and lacks org-mode's
enormous ecosystem of utilities besides; the former seems poised to become a different tool
altogether.

There is also the question of other Emacs packages like Denote, or frameworks based upon org-mode
like org-roam.
