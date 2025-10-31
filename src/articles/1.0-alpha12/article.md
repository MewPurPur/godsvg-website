---
slugcat: 1.0-alpha12
title: "New prerelease: GodSVG 1.0-alpha12"
tagline: A prerelease with a lot of quality of life changes and bugfixes. It also introduces a new optional layout area that previews your SVGs at various sizes.
author: MewPurPur
tags: release
date: 2025-10-31
release: 1.0-alpha12
prerelease: true
---

The 12th alpha of GodSVG implements a lot of minor improvements and bugfixes. The main things are a rework of dropdown widgets and an implementation of a new area of the layout for presenting your SVGs at various sizes.

## An area for SVG previews

Me and {% gh "sockeye-d" %} implemented a new part of GodSVG's layout, an area with various size previews of the SVG you're working on.

{% blogvid "previews.webm", "Video showcasing the SVG previews area." %}

The previews are not set in stone. You can add new ones, edit their sizes, delete them, and manage them in some other ways. You can also change the background color of the previewed one.

This is the first layout area that's not included in the active layout by default, since it's more niche. If you want to use it, you need to include it yourself - check out how in the video above. In the future, I may add more layout areas, although there are no plans for any new ones right now.

## Changes to fonts

GodSVG's font system has been touched up. All the old fonts have been optimized to the woff2 format, reducing their sizes. A new Droid Sans fallback font has been added, which improves how Chinese looks, fixes the Simplified Chinese locale not rendering on Web, and fixes its performance on Desktop. Altogether, this makes the GodSVG executable a little heavier, but I've decided it's worth it to support the Chinese locale better.

I also added the option to provide paths to your own fonts to be used in the app, with the default fonts remaining as fallbacks. If the font can't be loaded, the path gets cleared, reverting to the default behavior. This is not available on Web.

{% blogimg "fonts.webp", "Image of the settings menu, showcasing the new fonts setting and a Comic Sans font being used." %}

## Other improvements

Dropdowns have been reworked, now you can click anywhere on them to show a falling menu popup, instead of having to aim for the arrow. Editing them as text is a niche functionality for such fields, but I still allow that with right-click. For numeric dropdowns, allowing you to edit the text and enter an arbitrary number is important, so I've added a pencil icon inside the falling menu as a more straightforward way to change its value to something arbitrary, without needing to know about the right-click trick.

The optimizer is now configurable in a new tab in the settings menu. The options to remove comments, simplify path parameters, and convert shapes can now be separately toggled. This gives users more control and helps document how it works.

The new optimizer settings and the old formatter settings are now explained with a brief paragraph before the settings themselves. The optimizer settings have info buttons that show an info popup, instead of descriptions, since they are too complex for the small description box.

Right-clicking when editing text now shows two new options, "Select all" (which was already accessible via shortcuts), and "Evaluate". Previously, evaluation only worked on the full text when pressing [code]Enter[/code] in numeric fields, but now you can select any text, and if it can be evaluated, the option will be presented.

Also, the evaluator was improved a bit, clearing errors and adding constants "pi", "tau", "e", and "phi" and their capitalized and uppercase versions. Previously, only "PI" and "TAU" were recognized, which was unconventional. To be honest, I can't think of any good uses for Euler's number or the golden ratio in SVGs, so let us know if you come up with any!

Setting names were sometimes cut off when internationalized, which is unavoidable. In this new alpha, if a setting's text is too long and it gets cut off, it gets a tooltip with the full text.

The little widget for changing relativity of path commands in the "Insert after" popup is now activated by the [code]Shift[/code] key.

The color picker's alpha slider is now 0-255 instead of 0-100.

## Bugfixes

- Fixed undefined behavior when typing "</" at the end in the code editor
- Fixed undefined behavior when changing the application's language after certain layout changes
- Fixed various weird behaviors of shortcuts with focused text fields, especially with active popups
- Fixed visual issue when hovering arc toggles in light mode
- Fixed minor visual issues with editing pathdata and transform lists as text
- Fixed floating point precision issues in a few places
- Fixed scrolling the tab bar being FPS-dependent
- Fixed issue where, if drag and drop hasn't initiated, you could continue dragging and trigger it even after opening a popup or a menu
- Fixed issue in the custom file dialog where switching to another directory while file search is open makes the file list go out of sync
- Fixed dropdown in the directory path widget potentially going off-screen if the path is too long
- Fixed "Copy email" button in the "About" dialog not updating when hovering another translator for the same language
- Fixed zoom level changes when centering the canvas after resizing the SVG not being clamped
- Fixed path command conversion to Z (Close path) not being disabled if the previous command is Z
- Fixed asterisk showing up when pressing "Undo" in a newly edited SVG

Other than that, there have been some minor UI/visual tweaks and fixes.

## Translations

Thanks to {% gh "williamchange" %}, {% gh "Kiisu-Master" %}, {% gh "JinEnMok" %} and {% gh "Felipe-Sena" %} for helping to keep existing translations up to date.
