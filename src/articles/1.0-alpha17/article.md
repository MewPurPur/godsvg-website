---
slugcat: 1.0-alpha17
title: "New prerelease: GodSVG 1.0-alpha17"
tagline: The Grand Bug Extermination
author: MewPurPur
tags: release
date: 2026-08-30
release: 1.0-alpha17
prerelease: true
---

I'm planning to work on some big reworks in the next few prereleases, so for this one, I wanted to make sure GodSVG's established features are spotless and no bugs would distract me. I've kicked the butts of 70+ bugs, and I've made some small improvements to various features - mostly quick wins I hadn't thought of before.

## Improvements

I've given the SVG previews area the ability to preview lossy options - JPEG and lossy WebP. This could be used for more formats in the future. A creation gone wrong, or perhaps horribly right?

{% blogimg "previews_improvement.webp", "Image showcasing the new previews." %}

You can now double-click the empty part of the tab bar to create a new tab. Right-clicking tabs also now shows all file options, such as saving.

Paths can now be converted to polygons and polylines. These conversions are only allowed if the pathdata is correct, the condition for path closure is appropriate, and every segment is line-shaped.

The code editor's line numbers are now highlighted when the main caret is there, and clicking on them now puts the caret at the beginning of their line, so you no longer need to aim so precisely.

The widget for editing transforms now lets you convert a transform to an equivalent one. This means simple matrices can now be converted into basic transforms, basic transforms can be converted into matrices, and redundant transforms (e.g. an identity matrix, 1x1 scaling, or a 0-degree rotation), can be converted into anything.

The settings menu has an Undo-Redo system that used to only work for shortcuts. {% gh "rekcilyssup" %} and I expanded its operations, now it works everywhere except for the palettes tab and scrolls to the changed setting. The state also doesn't get erased as you switch between shortcut categories or settings menu tabs.

## Bugfixes

The "Remove comments" formatter option has been removed. Formatters aren't supposed to change the information in an SVG, only its representation - even if said information is nonessential - so this option caused issues.

Keyboard navigation was added or improved in a few places, and focus navigation received some fixes. Most importantly, focus is now preserved as you navigate through popups and menus even after you close them, making it way more usable.

The Previews layout area has been slightly redesigned to deal with some UI issues. The action button of preview tiles is now only visible when you select them, replacing the scale text. And a visual issue was fixed where the scale label above the big preview wouldn't update when you changed tabs.

Reference images received a lot of fixes. They now switch to being pixelated instead of blurry when scaled up more than 4x. An issue was fixed where around transparent areas, they would get ugly darkened edges. Their corners no longer snap to integers, which used to distort their aspect ratio on small canvases. And the implementation of per-tab show/overlay configs now finally works correctly.

Path handles have a secret feature where pressing `Ctrl` aligns them to the previous or next segment, ensuring smooth transitions. It used to be quite unreliable, though. This should now all be fixed. I've addressed a recent regression where in some cases, the handle would align to the (0, 0) coordinate instead of anything meaningful. The other fixes are to issues that have existed since this was implemented - closed subpaths are now treated correctly, zero-length segments are skipped (used to cause a crash), and the control point of quadratic curves can now be aligned to either the previous or the next segment.

{% blogvid "ctrl_align.webm", "Video showing using Ctrl to align path handles now working in more extreme scenarios." %}

I recently overhauled the color picker, now I've resolved some leftover issues from that rework. A common issue has been fixed where the reset button would show up, but do nothing. Some edge cases of color synchronization have also been fixed, as well as an issue where the RGB sliders would often be off by one, and a visual issue where the "invalid rectangle" wouldn't show up when editing an attribute with a URL default value.

The subpath operations added in the last alpha are also receiving follow-up fixes. Most importantly, "Reverse Order" no longer misshapes sequences of multiple S (Shorthand Cubic Bezier Curve to) commands. Another issue has been fixed where "Reverse Order" and "Set As Origin" would often generate zero-length lines. "Reverse Order" is getting a better heuristic for preserving path command relativity. "Set as Origin" now retains a shorthand curve command (S, T) if it's not directly after a curve of its type, instead of changing it to a fully defined curve (C, Q). And an edge case has been fixed where, when selecting multiple subpaths with a single M (Move to) command, "Reverse Order" would appear as an option, and also cause a crash if used. "Reverse Order" used to show up as an option even if the subpath only had a single "Z" command, but it doesn't anymore.

Another thing that was overhauled in the last alpha, and is now getting follow-up fixes, are conversions. I've made minor math improvements to some heuristics, fixed a regression in the path -> line conversion, fixed a quirk that made some rectangle-shaped polygons unable to convert to `rect`, and addressed various crashes and bugs when converting polygons and polylines into other shapes. As for path command conversions, zero-length segments now correctly list "Elliptical Arc to" as a lossless conversion option.

The pathdata and points editors have had countless issues with desync, undefined behaviors that got worse over time. Focus navigation was quite useful for them, but the implementation I cobbled up recently was sketchy. I have now fixed all of that.

{% blogvid "pathdata_focus.webm", "Video showing using only the keyboard to edit pathdata." %}

Certain routines in the optimizer were optimized significantly. A recent regression was also fixed that completely broke the "Shape simplification" option. And the logic was rearranged so that the optimizer now never needs to run twice to catch every optimization.

Now let's go through the rest of the bugfixes.

**Functional fixes:**
- Fixed some bad edge cases of the SVG parser that caused issues for valid SVGs
- Fixed exponents in pathdata and transform lists not being parsed correctly when right after a floating point
- Fixed being unable to save SVGs after changing the export formatter in a way that affects their export markup
- Fixed numerous undefined or erroneous behaviors of single line fields
- Fixed undefined behavior when using "Copy all text" in the Code Editor
- Fixed precision issues around shorthand quadratic Bezier curves
- Fixed precision issues around scale in the export config
- Fixed various issues in the logic for determining scale, width, and height of exported images
- Fixes and improvements to editing shortcuts
- Fixed context popup option "Open" and the Enter shortcut not working in the custom file picker
- Fixed negative radii in "Elliptical Arc to" commands being treated incorrectly in some cases
- Fixed a bug with context popup submenu navigation
- Various fixes to UI issues when text becomes too wide in some languages and reasonable fonts
- Fixed magnify gestures zooming into the center of the canvas, instead of their actual position
- Android: Fixes to various areas of the UI not working well on touchscreens

**Visual fixes:**
- Fixed regression in bounding box calculation when quadratic bezier curves are used
- Increased the precision of contour rendering to have way less mismatches at high zoom levels
- Fixed texture clipping issues in SVGs with fractional dimensions
- Fixed some bad edge cases of syntax highlighting in the code editor for XML entities
- Fixed an edge case where the shortcut text in context popups could overlap with the regular text
- Fixed various issues with text desync when changing the language
- Fixed various issues with font desync when changing the fonts
- Fixed file picker fields showing "~/" on some systems instead of the placeholder text
- Fixed various visual issues with configuring palettes
- Fixed incorrect condition for "XML indentation spaces" formatter setting warning
- Fixed path command insertion shortcuts incorrectly labeled as absolute-only
- Fixed checkerboard background missing for gradient previews

## Translations

Thanks to {% gh "anderlli0053" %} for adding a Slovenian translation!

There is also an easter egg translation...

Thanks to {% gh "williamchange" %}, {% gh "AlejandroMoc" %}, and {% gh "Kiisu-Master" %} for helping to keep existing translations up to date.
