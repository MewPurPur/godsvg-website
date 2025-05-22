---
slugcat: 1.0-alpha9
title: "New prerelease: GodSVG 1.0-alpha9"
tagline: The calm before the storm! This prerelease makes the layout configurable, fixes the update checker, and significantly improves stability.
author: MewPurPur
tags: release
date: 2025-05-18
release: 1.0-alpha9
prerelease: true
---

The 9th alpha of GodSVG has arrived! This prerelease makes the layout configurable, fixes the update checker, and brings in a lot of small features, improvements, and bugfixes. This alpha also gears us up for a big upcoming prerelease.

## The layout is finally configurable!

One of the most cumbersome aspects of using GodSVG was the inability to change the layout. Most people didn't want the inspector and code editor to be visible at the same time, and some didn't want to use one or the other at all. I have implemented a layout configuration widget to solve this. For now, you can change the positions of the code editor and the inspector, make them into separate tabs, or completely hide them. This is all done through a new popup to avoid cluttering the general UI. This should make it much easier to get comfortable with GodSVG.

{% blogvid "layouts.webm", "Video demonstrating how the layout can be configured" %}

The new default layout has the inspector and the code editor in two separate tabs, which can always be toggled between. If you prefer the old UI, you can easily change back to it through this system.

Not related to this feature, but on the topic of layouts, I've added a 250% UI scale option, and also made it so GodSVG can go fullscreen. Fullscreen mode can currently only be activated via shortcuts (like F11).

## Update Checker

All the way back in alpha 4, {% gh "Swarkin" %} implemented an update checker, but it was unfinished until now. Me and him have done a lot of back and forth on it, and now it's finally functional!

The update checker can be accessed from the three dots at the top left of the window. Right now, it can only be run manually. So don't forget to do that every now and then to check easily for new updates!

## Other goodies

The tab bar from the previous prerelease got some small refinements. {% gh "FlooferLand" %} and I made it so unsaved tabs will now also display their graphic in their tooltip. And I fixed an issue where upon first starting GodSVG, the active tab would be marked "Unsaved" rather than empty.

{% gh "FlooferLand" %} added support for opening multiple SVGs at once via the CLI, which used to crash. This also means that GodSVG can once again work as a default app for opening SVG files!

For the experimental Android build, {% gh "syntaxerror247" %} added support for arm32.

A button for copying the export SVG or image was implemented in the export menu by {% gh "FlooferLand" %}. This isn't implemented natively in Godot, so the implementation is awkward and may not work everywhere. We hope it's still useful for some of you.

I've also added a new setting for configuring the viewport's grid color. Aside from this, there are some other small enhancements and features to improve your experience with GodSVG.

## Bugfixes

The biggest bugfixes were to the shortcut system. On MacOS, shortcuts didn't work and the native menu had broken at some point - both of these issues have been fixed. An issue where multiple shortcuts could be triggered at once was also fixed (e.g. how Ctrl+Shift+Tab didn't work before, because Ctrl+Tab would activate at the same time). And buttons can now show their shortcut in the tooltip, as shown below:

{% blogimg "button_shortcut.webp", "Image of a button showing its tooltip" %}

I fixed two issues that could compromise SVGs. The bigger one is a parsing issue of exponents with decimal dot in pathdata and transform lists. The other was an off-by-one error when parsing colors in the "hsl()" format.

**Other bugfixes:**

- Fixed undefined behavior and broken highlighting when non-ASCII characters are entered into the code editor.
- Fixed undefined behavior and other bugs that could happen when clicking to edit a shortcut with some keys already being pressed.
- Fixed inspector layout not always handling deeply nested elements well.
- Fixed "Select all" shortcut not working on text if changed to something other than Ctrl+A.
- TextEdit and LineEdit no longer swallow "Ctrl+[Key]" inputs.
- Fixed rare edge cases where color picker values were off by one.
- Fixed color fields with alpha enabled not parsing the rgba(r, g, b, a) and hsla(h, s, l, a) formats correctly.
- Fixes and tweaks in the "About" menu.
- Fixed file dialog always having "Save SVG" as its title, even if you're saving a different format.
- Fixed pasting palette XML not being available if the XML starts with text or comments.
- Fixed caret display on top of tabs in code editor's overtype mode.
- Read-only shortcuts are no longer blocked from working if a duplicate exists.

## Translations

Thanks to {% gh "jas31415" %}, {% gh "JinEnMok" %}, {% gh "Swarkin" %}, and {% gh "Kiisu-Master" %} for keeping existing translations up to date!

I've added translation comments to the localization files that help clear up what some strings refer to. So if you wanted to [translate GodSVG to your own language](https://github.com/MewPurPur/GodSVG/tree/main/translations), now's a better time than ever!