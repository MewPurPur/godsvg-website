---
slugcat: 1.0-alpha10
title: "New prerelease: GodSVG 1.0-alpha10"
tagline: A smaller prerelease as I gear up for big reworks. This prerelease introduces the ability to import multiple SVGs at once and fixes some major bugs.
author: MewPurPur
tags: release
date: 2025-06-08
release: 1.0-alpha10
prerelease: true
---

The 10th alpha of GodSVG has arrived! This prerelease introduces the ability to import multiple SVGs at once, improves tab management, brings some enhancements and fixes several major bugs.

## Changes to file importing and tabs

Wanting to import a few SVGs at once is common, for example with icon sets. But in GodSVG, you had to do it one by one. I've now added functionalities for importing multiple SVGs at once. This works for all scenarios I'm aware of:

- Dragging multiple SVGs into the window. This would previously only check the first file, resulting in some unexpected behaviors.
- Selecting multiple SVGs in a file dialog. Both the native and the built-in file dialogs would previously only allow selecting one when importing SVGs.
- "Open with..." types of options when right-clicking multiple SVGs, which was added in the previous alpha, but had edge cases that didn't work well.

All three of these cases now use the same standardized robust system, and file dialogs allow selecting multiple files when you're importing SVGs. For convenience, dragging files into GodSVG now also focuses the window. And all non-SVG files are discarded right away, so you can drop files even from folders with a lot of clutter.

{% blogvid "multi_import.webm", "Video demonstrating the ability to import multiple files at once" %}

The custom file dialog went through a rewrite and received some minor enhancements and bugfixes.

Surrounding this change, I investigated whether it's a good idea to allow unlimited tabs, as previously, the limit was 50. I've decided to lift this restriction. To make it easier to manage tabs, I've added new actions for closing all empty or all saved tabs, and {% gh "Kiisu-Master" %} made scrolling through a lot of tabs work better.

## Other improvements

The default layout has been changed, the inspector is now the first tab by default as I meant it to be. Max UI scale is no longer rounded down to a multiple of 5%, as this was counterproductive.

The &lt;use&gt; element is now somewhat supported. It will show its "x" and "y" attributes in the inspector, and they also add a handle to the viewport. This element isn't available in the GUI, since it's not that well-supported yet, but if you type it in the code editor or encounter it in existing SVGs, you can now have a smoother experience with it. This was implemented by {% gh "Jordyfel" %}.

I've made it so incorrectly nested elements no longer affect aspects of the GUI. For example, incorrectly nested shapes won't show their handles in the editor, and unavailable gradients won't be presented in color pickers.

## Bugfixes

This prerelease's main goal was to quickly address some major bugs:

- Fixed an issue where some transform lists with commas could parse incorrectly, resulting in imported SVGs being broken
- Fixed an issue that could result in corrupted tabs in various situations
- Fixed an issue where upon first opening GodSVG, the first tab's contents wouldn't save
- Fixed a regression where dimensionless SVGs would crash when edited
- Fixed occasional glitchy handle movement on Android and Web (by {% gh "Jordyfel" %})
- Fixed various stability issues at high zoom levels and large coordinates

Other smaller bugfixes:

- Fixed a rare visual issue with elliptical arc path commands
- Fixed an edge case where &lt;rect&gt; elements were drawn as rounded when they shouldn't be
- Fixed code editor's scrollbar placement

## Translations

The source comments have been tweaked a bit so they can work around a bug in POEdit, thanks to a discovery made by {% gh "Kiisu-Master" %}.

Thanks to {% gh "AlejandroMoc" %} for adding a Spanish translation!

Thanks to {% gh "Kiisu-Master" %}, {% gh "freeducks-debug" %}, {% gh "Swarkin" %}, and {% gh "Felipe-Sena" %} for keeping existing translations up to date!
