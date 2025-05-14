---
slugcat: 1.0-alpha2
title: "New prerelease: GodSVG 1.0-alpha2"
tagline: GodSVG is out for web and MacOS!
author: MewPurPur
tags: release
date: Created
release: 1.0-alpha2
prerelease: true
---

It has only been two weeks since the first development build of GodSVG, but thanks to open-source contributions, there are already enough new things for a new alpha build.

# New web editor

With help from {% gh "aladvs" %}, I managed to test out and export GodSVG for web. This enables you to use GodSVG without having to download it. The performance of web is significantly worse and some features are going to be limited, but some users may still find it useful. (When the release was out, the web editor was experimental and on a different URL; now it's on https://godsvg.com/editor)

# New MacOS build

With help from {% gh "aaronfranke" %}, I've managed to test out and export GodSVG for MacOS. So if you wanted to use GodSVG on your Mac, now you can!

# Automated attribute formatting

{% blogimg "autoformatting.webp", "Image of the autoformatter" %}

Some options have been implemented for formatting attributes. They will be expanded in the future to allow for optimizing SVGs, by using the most compact formatting options. To access them, click the cog button above the code editor.

# New option for wrap-around panning

[video of using "Wrap mouse"]

In the general settings, a new option was added by {% gh "Kiisu-Master" %}. This option is disabled by default, and it's not available on the web editor as it's impossible to implement there. When enabled, this setting makes it so when you pan in the viewport, the cursor will now teleport when it reaches the edges.

# Handles for adjusting circles and ellipse radii, and rect sides

{% blogimg "auxiliary_handles.webp", "Image that shows off the auxiliary handles of a circle, ellipse, and rectangle" %}

In alpha 1, you could only move circles, ellipses, and rectangles around using the handles in the viewport. For this pre-release, I've implemented a few more handles for adjusting their geometry. 

# New ways to open files

Thanks to {% gh "ilikefrogs101" %}, SVG files can now be opened through the CLI, which also enables GodSVG to be used in "Open with..." dialogs. Also, thanks to {% gh "Kiisu-Master" %}, you can now drag and drop files inside the GodSVG window.

# Other improvements

There have also been various improvements to input handling in the viewport thanks to {% gh "Kiisu-Master" %}. Also, I have implemented the ability to convert different types of elements, for example converting a circle into an ellipse or a rounded rectangle. Aside from this, various little bugs and tweaks have been made to improve the experience of using GodSVG.