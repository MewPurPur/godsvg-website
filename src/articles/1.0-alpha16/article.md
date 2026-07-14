---
slugcat: 1.0-alpha16
title: "New prerelease: GodSVG 1.0-alpha16"
tagline: Operations that should work on multi-selections now do, while new subpath editing tools make complex vector paths easier to manipulate.
author: MewPurPur
tags: release
date: 2026-07-13
release: 1.0-alpha16
prerelease: true
---

Ever selected multiple things in an application only to find an operation mysteriously unavailable? In this prerelease, operations that should work on multi-selections now do, while new subpath editing tools make complex SVG paths much easier to manipulate.

## Subpath actions

A prominent concept in SVGs is that path elements are made out of subpaths, with a new subpath for each new M command (MoveTo) or after a Z command (ClosePath). A lot of changes have been made to accommodate this concept better.

M commands (MoveTo) now have square-shaped handles on the canvas to communicate to users where subpaths start.

The inspector also now has subtle indicators for where subpaths start and end, to communicate the concept clearly. It appears to the left of path commands.

{% blogimg "subpath_indicators.webp", "Image showcasing the new subpath indicators." %}

Selecting whole subpaths now shows some new actions. Firstly, if the selected subpaths aren't the first ones of the path, you'll see a "Move up" action, and likewise you'll see a "Move down" action if they aren't the last ones. These operations adjust the pathdata to make sure the shape of the path stays the same, even with relative path commands.

A more novel new action is reversing a subpath's order. This can change a clockwise subpath into a counterclockwise one or vice versa. In SVGs, orientation may specify whether a subpath would be carved out as a hole, so this operation would be very useful to fix holes with the wrong orientation.

There is also the option to set the initial point of a closed subpath, that is, a subpath that ends with a Z (ClosePath) command. The selected point becomes the new M (MoveTo) command, and all points are rotated around and changed a bit to connect well.

{% blogvid "subpath_operations.webm", "Video showcasing the new subpath operations." %}

You can also use these new operations similarly on polygons and polylines.

## Multi actions

It's unpleasant when you make an exact selection on a software, wanting to apply the same operation on multiple items, only to find that you have to do it one by one. The "Convert to" actions of GodSVG were like that, but not anymore.

Multiple elements or even XML nodes can now be converted at once, as long as they have common conversion options. Selected 5 circles and 3 ellipses? You can turn them into 8 paths with one click. Or into 8 ellipses. Or even into 8 circles, if all the ellipses have equal major and minor radii.

This also applies to path commands. There were some other improvements to path command conversion - exact conversions are now highlighted on top. A couple of conversion rules were added and even utilized in the optimizer. Quadratic beziers now have an exact conversion to cubic ones, and if a cubic bezier can be converted to an exact quadratic, it won't be flattened in the conversion. Path closures now also use the contour they had when you convert them. And a few other minor improvements.

{% blogvid "multi_convert.webm", "Video showcasing the new multi conversion functionality." %}

On the popup for inserting a path command, you can now hold `Ctrl` or `Shift` and it won't close, allowing you to easily add multiple path commands at once. The popup also has a toggle for enabling this behavior by default. Since polygons and polylines don't have such a popup, an "Insert Multiple" option was added to them instead, opening a popup that lets you choose how many points to add.

{% blogvid "multi_insert.webm", "Video showcasing the new multi insertion functionality." %}

Selecting multiple subpaths now works when you hold `Ctrl` while double-clicking any command within them, or the corresponding handle. All of the new subpath-related actions also work with multiple selected subpaths.

The code editor has been a little neglected, but at least in this release, it gets multi-carets. You can create or destroy carets by holding Alt while clicking to place a caret. Some shortcuts exist around this feature, like `Ctrl+Shift+Up/Down` to place carets directly above/below existing ones, or `Ctrl+D` to jump to the next instance of a selection and place a caret there. They are undocumented for now and may change in the future.

## Other improvements

Adding new elements or XML nodes, as well as moving them up/down in their parent element, now puts them in the viewable area of the inspector. If multiple are selected, the one designated as "pivot" will be scrolled to. This also happens with points and path commands now.

On Android, immersive mode was enabled once again, but this time cutouts and corners were taken into consideration, shifting UI elements to avoid obscuring any of them.

## Bugfixes

Some of the reworked systems resulted in fixes to minor old bugs.

Palettes were broken after last release: There was a crash when trying to edit palette colors, and also an issue that prevented color swatches from being selected until the color attribute gets set. Both were fixed.

Other bugfixes:
- Fixed issue where clicking context popup options corresponding to an action with a shortcut triggered that action twice
- Fixed issue where the VSync setting had no effect in new sessions
- Fixed some issues with pathdata and point list fields
- Fixed issues with not updating the "pivot" for Shift selections after certain operations
- Renamed "Show in File Manager" to "Open in File Manager" for folders in the custom file dialog

## Translations

Thanks to {% gh "williamchange" %}, {% gh "AlejandroMoc" %}, and {% gh "Kiisu-Master" %} for helping to keep existing translations up to date.
