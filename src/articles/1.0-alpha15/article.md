---
slugcat: 1.0-alpha15
title: "New prerelease: GodSVG 1.0-alpha15"
tagline: This prerelease improves several areas of GodSVG, especially the color picker. It also refines the logo and branding of the application.
author: MewPurPur
tags: release
date: 2026-04-26
release: 1.0-alpha15
prerelease: true
---

In this prerelease, GodSVG is receiving significant improvements to its color picker, with an implementation of the HSL color model and multiple picker shape options. Besides that, a few smaller features have been added and some bugfixes and regressions have been fixed, especially around the recent implementation of keyboard focus navigation.

## New logo

I've refined GodSVG's logo and I hope you like the new look!

{% blogswitch "Old logo", "splash_before.webp", "Image showing the old splash", "New logo", "splash_after.webp", "Image showing the new splash" %}

There are no plans to update this logo for the foreseeable future, so this may remain GodSVG's logo until the end of time.

A monochrome icon has also been added for Android:

{% blogimg "monochrome_logo.webp", "Image showcasing GodSVG's new monochrome icon." %}

## Color picker rework

The color picker lacked configurability and was often criticized as unintuitive. I wanted to finalize this widget once and for all. Overall, the UI was improved, the color picker is shown first, and I made everything fully able to be navigated with the keyboard.

In the color picker area, I've added configurability. There's a new popup you can open that lets you configure it by choosing which color models you see (RGB, HSV, and the newly added HSL model). It also allows you to choose a picker type, with several picker types already implemented. More color models and picker types may be implemented in the future.

{% blogvid "color_picker.webm", "Video showcasing the new abilities of the color picker." %}

In the utilities area, clicking on a swatch no longer instantly picks the color, and the search bar in the palettes view is now always visible. Undo and redo work across the widget.

## Other improvements

Focus navigation with the keyboard has been brought back to the widgets for editing pathdata and points.

The exporting menu was improved in a number of ways. The final size of the image is now always shown or estimated, thanks to an implementation by me and {% gh "sockeye-d" %}. I've added the ability to add a background color in raster formats (PNG, JPEG, WebP). This color is forced opaque on JPEG, fixing an old issue as JPEGs don't support transparency.

SVGs can now be exported with the DDS format, a format used by videogame developers for optimizations.

The font customization settings now have visuals.

{% blogimg "font_presentation.webp", "Image showcasing how fonts are presented in the description box." %}

Syntax highlighter text colors have been tweaked, with a new color added for XML entities (`&amp;` `&lt;`, etc.)

A "Spacious" formatting style has been added, which formats the SVG such that every attribute is on a new line.

## Build system

Executables now include the GodSVG version in their filenames to avoid confusion. For example, this release's Windows build is named **GodSVG_v1.0-alpha15.exe**.

For Linux, I've updated the .desktop file and added a .metainfo file. These files are relevant for integration and distribution.

GodSVG now also provides AppImages builds on Linux, which are downloaded by default. AppImages are self-contained application packages that run on most Linux distributions without installation. Traditional raw executables are still available, but only via GitHub.

## Bugfixes

- Fixed bug where undo in newly created tabs would set the text to empty
- Fixed centered popups not behaving well when resized
- Fixed various regressions from the new keyboard focus navigation
- Fixed some visual bugs and regressions
- .jfif, .jpe, .jfi, .jif extensions now recognized as JPEG images
- Android: Fixed regression in large context popups
- Android: Improved UI scale calculations
- A lot of other small fixes

## Translations

The .desktop file for Linux is now automatically generated and doesn't need to be translated separately. Creating a full translation for a locale is once again as simple as finishing its .po file.

Thanks to {% gh "williamchange" %}, {% gh "JinEnMok" %}, and {% gh "Kiisu-Master" %} for helping to keep existing translations up to date.
