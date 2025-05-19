---
slugcat: 1.0-alpha5
title: "New prerelease: GodSVG 1.0-alpha5"
tagline: This prerelease adds support for gradients, groups, percentages in numeric attributes, and much more.
author: MewPurPur
tags: release
date: 2024-09-01
release: 1.0-alpha5
prerelease: true
---

GodSVG releases its fifth alpha, which includes a necessary core refactor that enables a lot of important features and bugfixes. This is the next big step towards a stable release!

## Grand internal rework

In the last prerelease, I mentioned how my biggest priority was to massively rework how SVGs are handled internally. I've finally managed to do it, and this unlocked some big features.

The most important change is that some attributes can now propagate, overriding the default values of nested elements. Also, elements now have a special case for calculating the transform attribute, allowing it to accumulate. These two changes finally made it possible to implement the extremely important &lt;g&gt; element. It can now be added from the "Add new element" popup.

{% blogvid "g.webm", "Video of using groups" %}

The &lt;svg&gt; element now also correctly propagates attributes when it should - something that wasn’t previously handled - fixing some longstanding issues.

The data about attributes is now in a central place, which allows even for unrecognized elements to show widgets for familiar SVG attributes. For example, polygon is not implemented yet, but if you have a fill attribute in one, you'll now be able to use the color picker for it.

These changes also allowed for percentages to be interpreted correctly in numeric attributes. GodSVG will now show the correct contours and handles.

An attribute type for the id attribute was implemented, and with that, &lt;linearGradient&gt; and &lt;radialGradient&gt; finally became possible to implement. Both &lt;linearGradient&gt; and &lt;radialGradient&gt; can now be added from the "Add new element" popup, along with the &lt;stop&gt; element. Once you define some valid gradients, the palettes tab of color pickers will show them up top.

{% blogvid "gradients.webm", "Video of using gradients" %}

Since some of these new elements and attributes can be tricky to use, I’ve added configuration warnings. When hovered, they will show a tooltip explaining the issue with the current configuration. For example, a &lt;stop&gt; element will now show a configuration warning if it's placed outside of a gradient.

{% blogimg "config_warning.webp", "Image of a configuration warning tooltip" %}

Unfortunately, this internal rework may result in loss of performance and some new bugs. But I've spent so long fixing bugs that I still expect this alpha to be the most stable so far.

## Formatters

SVG formatting is now handled by dedicated formatter profiles, and you can assign different ones for editing and exporting.

I've also finally implemented a "Pretty formatting" option, which uses newlines and indentation to make editing more convenient. It's enabled by default for the Editor formatter, but not in the Export formatter which uses a compact profile by default.

## Other goodies

- When dragging element frames around, the drop indicators will now show a warning color if this is an invalid child (for example, dropping anything other than a &lt;stop&gt; element under a gradient).
- An Eyedropper has been added to the color picker, allowing you to pick any color from within the app.
- Bounding boxes are now shown visually with an animated rectangle.
- Native global menu for MacOS (by {% gh "aaronfranke" %} and me)
- The language options now show their completion percentages
- Added Simplified Chinese translation (by {% gh "Hamster5295" %})
- Added Dutch translation (by {% gh "Racer911dash1" %})
- Updates to existing translations (by {% gh "Vovkiv" %}, {% gh "JinEnMok" %}, and {% gh "Swarkin" %})
- A lot of smaller improvements and bugfixes by me and {% gh "Kiisu-Master" %}... too many to list. Maybe I'll start listing them when GodSVG becomes more stable.