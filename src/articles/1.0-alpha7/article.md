---
slugcat: 1.0-alpha7
title: "New prerelease: GodSVG 1.0-alpha7"
tagline: Introducing an experimental Android build, quality of life changes, and stability.
author: MewPurPur
tags: release
date: 2025-01-12
release: 1.0-alpha7
prerelease: true
---

GodSVG releases its seventh alpha! This prerelease focuses on stability, setting the stage for bigger changes in the upcoming alphas.

## GodSVG on mobile!

GodSVG now has an experimental Android port! {% gh "syntaxerror247" %} has led the effort to bring it to mobile, with adaptations for touch controls - including a floating shortcut panel designed to replace desktop keyboard shortcuts.

{% blogimg "shortcut_panel.webp", "Image of the shortcuts panel on mobile" %}

Other aspects of GodSVG have not yet been optimized for touch input, so the mobile port will remain experimental for the time being. In future versions, we want to improve the touch controls further and implement a native file picker.

As you can imagine, maintaining a mobile build is difficult because of how different touchscreens are. I'm worried that limiting my reliance on hovering and keyboards, even when they seem optimal for a UI, may come at the expense of Desktop builds, so it's possible I will discontinue Android builds in the future. It depends on whether mobile development can proceed without noticeably compromising the desktop experience.

Development for mobile will for now continue on another repository that's not managed by {% gh "syntaxerror247" %} and not me: https://github.com/syntaxerror247/GodSVG-Mobile. Riskier features will be implemented there first, but they may eventually be implemented in the main repository too. This will allow me to focus on the big changes I've planned for Desktop platforms, without worrying about breaking the app on Android.

## Other new things

This prerelease has a big emphasis on bugfixes, so there aren't a lot of other new features. Still, there are a few noteworthy additions - let’s take a look.

The formatters introduced in the last prerelease have been simplified. Now there are just two: an Editor formatter and an Export formatter, each with separate configurations. This should be more convenient and less confusing for nearly everyone.

The export menu was reworked. The preview now accurately reflects how the file will look after rasterization and lossy compression, if those options are selected. The width and height can also now be inputted manually, if you want to reach specific dimensions, instead of having to do math to choose a perfect scale.

{% blogcompare "Before", "export_menu_before.webp", "Image of the old export menu", "After", "export_menu_after.webp", "Image of the new export menu" %}

Partial support for the "currentColor" keyword and the "color" attribute has been introduced. Although they can't be added through the GUI yet, they will work fine if the imported SVGs have them or if you add them through the code editor.

The robustness of savefiles has been improved. There are now far fewer file operations on startup, which may slightly help with performance and hardware wear (the effects for both seemed minimal, but this is still future-proofing). The changes should also improve the backwards compatibility to alpha 7 from future versions.

## Bugfixes

I've fixed a lot of bugs in this prerelease. GodSVG is actually becoming quite stable lately, so I think it's time that I start listing the bugfixes thoroughly.

**Major bugfixes:**
- In the last alpha, I promised that I've fixed precision issues (like coordinates becoming 7.499998 instead of 7.5). But transform attributes could still cause issues. That's now been fully resolved.
- Fixed issue where a capital exponent "E" wouldn't be parsed correctly, resulting in some SVGs breaking when imported.
- Fixed various issues with UI scale. Hopefully everything is now resolved!
- Tightened up many quirks of how colors are handled and presented.
- Fixed various usability issues with attribute fields of the root SVG element.
- Fixed graphic getting messed up when percentages are used on indirect children of the root SVG element.

**Minor bugfixes:**
- Fixed "Open SVG file" functionality not being available if you import an SVG.
- Fixed issue with pixels poking out of the eyedropper frame.
- Fixed issue where pressing Z in the viewport to create a path command didn't create an undo action.
- MacOS: Fixed "About GodSVG" button in the global menu not working.

## Translations

Thanks to {% gh "thatoddshade" %} for translating GodSVG in French!

Thanks to {% gh "Swarkin" %}, {% gh "mikelei8291" %}, and {% gh "jas31415" %} for keeping existing translations up to date.