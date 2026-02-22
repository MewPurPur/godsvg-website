---
slugcat: 1.0-alpha14
title: "New prerelease: GodSVG 1.0-alpha14"
tagline: Better keyboard controls, neutral gray theme, bugfixes.
author: MewPurPur
tags: release
date: 2026-02-22
release: 1.0-alpha14
prerelease: true
---

This prerelease tightens the experience of using GodSVG a little more by improving keyboard controls, adding a neutral gray theme, and fixing a few bugs.

## Focus keyboard navigation

Focus navigation with <key>Tab</key>, <key>Shift+Tab</key>, and arrow keys has been added to some parts of GodSVG's interface. To avoid confusing users who don't use this feature, the focus highlights are hidden until you start navigating with your keyboard.

Context popups needed to be reworked to accommodate these changes. Aside from the added ability to navigate them with the arrow keys, there were some other changes to make them behave conventionally.

{% blogvid "focus_navigation.webm", "Video showcasing keyboard focus navigation." %}

This feature is not complete yet, but it will always be taken into consideration when implementing new UI areas, and slowly make its way into the parts of the interface that still haven't implemented it. These are most notably:

- Most of the UI related to the inspector (as the inspector is currently being reworked)
- Most of the settings menu
- Most of the color picker
- Most of the transitions between different parts of the UI layout
- Most of the previews area

## Other improvements

The grid's drawing logic has been slightly tweaked to be more consistent and performant. A new option was also added to change the number of major lines in the grid.

{% blogvid "grid_ticks.webm", "Video showcasing keyboard focus navigation." %}

The logic for copying an export image to clipboard has been improved by {% gh "williamchange" %} and {% gh "sockeye-d" %} and should now work better on Linux and MacOS.

A new theme preset has been added, "Gray". It's a dark theme, but a little less dark than the default. Colored themes create white balance bias, for example the default blue theme makes neutral grays appear yellowish, so this preset is a quick shortcut for people who want to avoid this problem.

## Bugfixes

GodSVG's SVG renderer, ThorVG, has been updated to a newer version, fixing a couple of issues with displaying trickier SVGs.

Besides that, here's a list of bugfixes in this verison:

- Fixed issue where character entity references (such as `&lt;` which is used to represent the `<` symbol) were wrongly translated by GodSVG, which broke valid SVGs
- Fixed an issue with transform list parsing issue which broke some valid imported SVGs
- GodSVG now follows the convention of treating file extensions with all types of casing the same (like "PnG" and "png")
- Fixed a couple of issues with deleting tiles in the previews widget
- Fixed regression with middle mouse button leaving behind "ghost" tabs
- Fixed issues with the button for copying translator emails being hard to press
- Windows: Fixed usage of backslashes in file paths leading to some issues

There have also been some minor UI/visual tweaks and fixes.

## Translations

Thanks to {% gh "williamchange" %} and {% gh "Kiisu-Master "%} for helping to keep existing translations up to date.
