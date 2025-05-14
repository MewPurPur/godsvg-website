---
slugcat: 1.0-alpha2
title: "New prerelease: GodSVG 1.0-alpha2"
tagline: After only two weeks, there are already enough new things for a new alpha build. Most notably, GodSVG is out for web and MacOS!
author: MewPurPur
tags: release
date: Created
release: 1.0-alpha2
prerelease: true
---

It has only been two weeks since the first development build of GodSVG, but thanks to open-source contributions, there are already enough new things for a new alpha build.

# New web editor

With help from {% gh "aladvs" %}, I managed to test out and export GodSVG for web. This enables you to use GodSVG without having to download it. The web version's performance is significantly worse and some features are going to be limited, but I'm sure it will be preferred by some users.

*At the time of the release, the web editor was experimental and on a different URL; now it's stable and can be found at <https://godsvg.com/editor>.*

# New MacOS build

With help from {% gh "aaronfranke" %}, I've managed to test out and export GodSVG for MacOS. So if you wanted to use GodSVG on your Mac, now you can!

# Automated attribute formatting

Some options have been implemented for formatting attributes. They will be expanded in the future to allow for optimizing SVGs, by using the most compact formatting options. To access them, click the cog button above the code editor.

{% blogimg "autoformatting.webp", "Image of the autoformatter" %}

# New option for wrap-around panning

In the general settings, a new option was added by {% gh "Kiisu-Master" %}. This option is disabled by default, and it's not available on the web editor as it's impossible to implement there. When enabled, this setting makes it so when you pan in the viewport, the cursor will now teleport when it reaches the edges. See it in action below:

{% blogvid "wrap_mouse.mp4", "Video showcasing the Wrap Mouse setting" %}

# Handles for adjusting circles and ellipse radii, and rect sides

In alpha 1, you could only move circles, ellipses, and rectangles around using the handles in the viewport. As shown in the image below, this prerelease implemented a few more handles for adjusting their geometry.

{% blogimg "auxiliary_handles.webp", "Image that shows off the auxiliary handles of a circle, ellipse, and rectangle" %}

# New ways to open files

Thanks to {% gh "ilikefrogs101" %}, SVG files can now be opened through the CLI, which also enables GodSVG to be used in "Open with..." dialogs. Also, thanks to {% gh "Kiisu-Master" %}, you can now drag and drop files inside the GodSVG window.

# Other improvements

There have also been various improvements to input handling in the viewport thanks to {% gh "Kiisu-Master" %}. Also, I have implemented the ability to convert different types of elements, for example converting a circle into an ellipse or a rounded rectangle. Aside from this, various little bugfixes and tweaks have been made to improve the experience of using GodSVG.