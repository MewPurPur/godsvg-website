---
slugcat: 1.0-alpha4
title: "New prerelease: GodSVG 1.0-alpha4"
tagline: A new prerelease focused on quality of life, stability, and performance.
author: MewPurPur
tags: release
date: 2024-06-06
release: 1.0-alpha4
prerelease: true
---

## Rework of attribute defaults

Right now, my biggest priority is to massively rework how SVGs are handled internally. I wasn’t able to complete it for this prerelease, but I was able to salvage one small improvement from my attempts: A change to how default values are treated. Attribute fields will no longer have any text if the attribute hasn't been declared. Instead, they will show their default value as dimmed placeholder text.

## Improved user experience

I worked with {% gh "Qainguin" %} to improve exporting. Web exports have been fixed, and support for WebP and JPEG formats has been added.

I've made popups display their keyboard shortcuts. This is pretty unobtrusive and allows for easier learning.

{% blogimg "context_shortcuts.webp", "Image of shortcuts in context popups" %}

I've also made some speed optimizations for this release, which should make SVGs load ~30% faster on average. Some other changes should allow GodSVG to open much larger SVG files without crashing. {% gh "Kiisu-Master" %} and I also worked to fix some memory leaks.

## Reference image

A common workflow in vector graphics is to vectorize over a background reference image. I worked with {% gh "Qainguin" %} to implement this feature for GodSVG on all Desktop platforms. The Web implementation will be a little more difficult, the technology is not there yet. It will be implemented at a later point.

{% blogvid "reference.webm", "Video of the new reference image functionality" %}

## Other goodies

- Improvements to UI scale logic and settings (by {% gh "aaronfranke" %} and {% gh "Kiisu-Master" %})
- Debug information accessible through F3 (by me and {% gh "Kiisu-Master" %})
- "Show in List" functionality when right-clicking handles in the viewport (by {% gh "WeaverSong" %})
- More shortcuts for convenience, such as Ctrl+Q (by me)
- Translation updates (by {% gh "Vovkiv" %} and {% gh "JinEnMok" %})
- Improvements to handling SVGs without specified dimensions (by me)
- A lot of smaller improvements and bugfixes by me, {% gh "Qainguin" %}, {% gh "ilikefrogs101" %}, {% gh "Kiisu-Master" %}... too many to list. Maybe I'll start listing them when GodSVG becomes more stable.