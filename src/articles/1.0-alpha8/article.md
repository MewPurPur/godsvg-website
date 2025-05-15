---
slugcat: 1.0-alpha8
title: "New prerelease: GodSVG 1.0-alpha8"
tagline: This prerelease implements tabs, improves performance, and delivers an insane number of bugfixes!
author: MewPurPur
tags: release
date: 2025-03-15
release: 1.0-alpha8
prerelease: true
---

The 8th alpha of GodSVG has arrived! This release introduces tabs in GodSVG and massively improves stability and performance. The features and bugfixes below are not attributed because I was responsible for almost the entirety of the release - except {% gh "Kiisu-Master" %} who implemented a "Middle mouse button to close tab" option.

# Implemented tabs

One of the most cumbersome aspects of using GodSVG was the inability to edit multiple SVGs at once. I have implemented a tab system to lift this hurdle. This initial implementation is already quite comprehensive and polished, so I don't expect it to change a lot in the future.

Tabs have all the basic functionalities and some extras, like closing multiple tabs, tooltips, and reasonable UX with many tabs. It also now made more sense to split "Save SVG" into two options, "Save SVG" and "Save SVG as...", so I've done that too.

{% blogvid "tabs.webm", "Video of using tabs" %}

# Other features and improvements

GodSVG used to be unusable for some Windows users because of a warning. This has been addressed in this prerelease.

UI Scale has been reworked into a single setting that only allows the valid options. The UI is now prevented from getting too small. This was a common problem, especially on Web, and unavoidable on itch.io with the old implementation. There is now an "Auto" option (same as "Auto UI Scale" used with the "1.0" UI scale before), a range of appropriate hard-coded values that should be safe, and a "Max" option. For example, if the maximum determined UI scale is 145%, you can now use that instead of being limited to 125%. Custom UI scale will be implemented in the future.

GodSVG is built in Godot Engine, which recently released a new 4.4 version, and we've moved to it. This resulted in significant performance improvements (some of them thanks to my own contributions!). It also updated the SVG renderer (ThorVG), resulting in significant fixes and improvements to SVG rendering and rasterizing.

{% blogcompare "Ground truth", "raster_ground_truth.webp", "Image of an SVG without rasterization", "Before", "raster_before.webp", "Image of the old rasterization", "After", "raster_after.webp", "Image of the new rasterization" %}

**And now for a lightning round:**
- Implemented a "Show SVG in File Manager" option.
- Palettes now have a "Save as XML" option. The "Paste XML" option was quite destructive, so now it's only available when creating a new palette.
- The "About" dialog was likely not comprehensive enough to comply with some third-party licenses; this has now been addressed.
- Redundant transforms in the transform popup are now grayed out.
- Repeated shortcuts for the same action are now tinted as warnings.
- Improved rect->path conversion for rounded rectangles with only vertical or horizontal segments.
- The window's minimum size was increased by exactly 1.5625%, I hope that's okay with everyone.

# Translations

A big regression from the last prerelease was fixed, where the language didn't persist between sessions.

Thanks to {% gh "Felipe-Sena" %} for translating GodSVG in Brazilian Portuguese!

Thanks to {% gh "Swarkin" %}, {% gh "thatoddshade" %}, {% gh "JinEnMok" %} for keeping existing translations up to date.

# A whole new level of stability

This prerelease went through an immense bugfixing stage. Let's first go through the most important ones.

Previously, the "View in List" functionality did nothing with path commands and polygon/polyline points. This has now been fixed.

The "Export" formatter settings used to have no effect, aside from the XML formatting settings (which is why I missed this to begin with). This has now been fixed.

Uppercase "E" for exponent notation is a valid syntax in pathdata and transform lists, but GodSVG didn't recognize it, resulting in some imported SVGs getting broken. This will no longer happen. 

When the viewbox of a graphic was different from its width and height, shapes added from the viewport's right-click popup were not using the correct position. This has been fixed.

**Undefined behavior has been fixed for the following scenarios:**
- When removing a directory from which you've recently imported a file.
- When importing an invalid SVG.
- When making rect->polygon and line->polyline conversions.
- When opening the popup to insert a path command after the last one.
- When using your keyboard to add path commands to a newly created path in certain situations.

**Functional fixes:**
- Improved the viewport's stability.
- Fixed issues with text selection in the SVG text editor.
- Fixed issue where after importing or pasting a palette XML, subsequent edits to that palette didn't get saved.
- Fixed selection not updating when clicking a handle of an already selected path/polygon/ polyline.
- Fixed issue where changing an "id" attribute didn't create an Undo action.
 - Fixed shortcuts handled incorrectly in the savedata.
- Removed "Convert To" option from unrecognized XML nodes.
- Fixed issue with wrong undo/redo state if the Undo action was created on the same frame that a continuous change to an attribute was started.
- Fixed issue where clicking outside of read-only single line text fields didn't deselect the text.
- Fixed edge cases with the "Show handles" setting.
- Fixed selection remaining the same when editing attribute fields of the root element.
- Fixed several usability issues with the custom file dialog.
- Fixed text fields unfocusing when you scroll outside of their area.
- Fixed "Convert To" option erroneously appearing for multi-selections.
- Fixed export menu not handling certain configurations (gigantic or miniature dimensions) correctly.
- Fixed undo/redo options of single line text fields not being disabled when they should be.
- Fixed element not getting selected when clicking unrecognized attribute fields.
- Fixed "Copy path" of the built-in file dialog not working correctly with directories.

**Visual fixes:**
- Fixed tooltips being blurry
- Fixed some UI elements sometimes being blurry even at 1.0 scale.
- Fixed visual issues when adding another Z path command before an existing one.
- Fixed various issues where hover indication for handles would not update, or fail to work correctly.
- Fixed several visual issues with the animated bounding boxes.
- Fixed selected element frames becoming translucent when initiating a Drag & Drop action anywhere in the editor.
- Fixed "currentColor" inside gradients resulting in wrong previews.
- Fixed warning for solid color gradients being unreliable in some edge cases.
- Invalid shortcuts no longer appear in context popups.

# Known regressions

Be careful when updating to this release from a previous one, as your savefiles will be corrupted (because one of my three config classes was named exactly like a new Godot Engine class - what are the odds!). You can find your savedata by clicking "View savedata" from the three dots at the top left. Palettes can also be copied as XML from the UI and then pasted back after updating

For MacOS users, this update isn't recommended, because shortcuts and the native bar are known not to work on it. I still don't know if the issue is new to this prerelease.