---
slugcat: 1.0-alpha1
title: GodSVG's first development build is out!
tagline: After months of hard work from me and some contributors, GodSVG is finally usable and all roadblocks to an initial alpha release have been lifted. Time to present it to the world!
author: MewPurPur
tags: release
date: 2023-12-05
release: 1.0-alpha1
prerelease: true
---

A few months ago in May, I started working on an SVG editor inside Godot called GodSVG. In June, I open-sourced it. After five months of hard work and with help from a few contributors, I've made GodSVG usable and lifted all of the roadblocks to an initial alpha release. The last blocker was the lack of Undo and Redo, but now they have been implemented and I'm ready to present GodSVG to the world. 

# A code-focused SVG editor

GodSVG's main goal is to try to be the best SVG editor out there for directly working with the code and structure of SVG files. It represents the SVG hierarchy exactly as it is and allows you to edit the SVG's text and see changes in real time. This should make GodSVG great for creating simple SVGs and for optimizing them, although this potential is not realized yet.

{% blogimg "code_selection.webp", "Image of doing a code selection" %}

# Other editing methods

Aside from the code editor, there is an inspector which allows you to edit some attributes with the help of various widgets. Color fields come with a color wheel widget, as well as palettes that can be adjusted in the settings. The path editor took especially long to get right: It explicitly represents the pathdata as a list of path commands, allowing you to precisely edit the numbers.

{% blogimg "path_element.webp", "Image of a path element" %}

And of course, there is the viewport, which can be panned and zoomed, and it has handles for adjusting the geometry of paths and other shapes. It has a convenient adaptable grid, a checkerboard pattern, options for hiding the grid and the handles, and for viewing the rasterized SVG.
