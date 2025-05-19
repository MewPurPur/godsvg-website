---
slugcat: 1.0-alpha6
title: "New prerelease: GodSVG 1.0-alpha6"
tagline: This prerelease focuses on stability, setting the stage for bigger changes in upcoming alphas.
author: MewPurPur
tags: release
date: 2024-12-07
release: 1.0-alpha6
prerelease: true
---

GodSVG releases its sixth alpha! This prerelease focuses on stability, setting the stage for bigger changes in upcoming alphas.

## XML nodes

Elements are the most important type of XML node, but there are a few others: Comments, text, and CDATA. Text and CDATA can affect the SVG in some situations, as they can be used to provide elements such as tspan with text. However, GodSVG didn't parse these XML nodes, and this was a problem. Even though the SVG renderer doesn't support any of the elements that use them, this still meant that if you had an SVG with text elements, and you took it in and out of GodSVG, it would get corrupted.

Addressing this was my main focus for this alpha release. If the SVG you import or paste into GodSVG has XML nodes other than elements, they will now no longer be omitted. Text, CDATA, and comments can also be converted between each other.

{% blogimg "xml_nodes.webp", "Image of the three XML nodes" %}

## Other new things

This development cycle had a big emphasis on bugfixing, so there aren't a lot of other new features. Still, a few new features made it in - here's what’s new.

Support for the polygon and polyline elements has been added. These work like a path element with only lines. You can add them from the "Add new element" popup.

On web, reference images have finally been implemented. Also, one of the biggest issues on web was clipboard checks failing and triggering intrusive popups - this has now been resolved. Another fix for web, exports now properly respect all configuration options.

## Smaller enhancements

Many thanks to {% gh "Vovkiv" %} and {% gh "Swarkin" %} for helping with keeping translations up to date.

- You can now open the currently worked on file via the OS image viewer.
- The editing of palettes and formatters has been improved.
- In the settings menu, color fields can now handle syntaxes with alpha channels ("rgba()" and "hsla()").
- There's some optimization compared to alpha 5.
- Path popups now only disable path commands that would result in an invalid syntax, others are marked as warnings and still allowed.

## Major bugfixes

This release had a lot of bugfixes, so I'm only listing the most important ones.

- Fixed precision-related issues (i.e., you should no longer get 12.399998 instead of 12.4).
- Fixed issues when dragging handles while UI scale is different from 1.0.
- Fixed rasterization of SVGs with fractional size.
- Fixed viewBox not handling exponent syntax (i.e., "2e3").
- Fixed undefined behavior when color attributes reference a URL other than a &lt;linearGradient&gt; or &lt;radialGradient&gt;.
- Fixed shortcut buttons displacing the UI when the shortcut text is long.
- Fixed bug where camera limits are broken for very small SVG dimensions.